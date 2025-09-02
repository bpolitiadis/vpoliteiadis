import type { Logger } from 'pino';
import { logger, shouldSample } from './logger.js';
import { captureErrorWithContext } from './sentry.js';

// HTTP client configuration
interface HttpCallOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData | URLSearchParams;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface HttpCallContext {
  target: string;
  requestId?: string;
  traceId?: string;
  logger?: Logger;
}

// Enhanced fetch wrapper with logging and error handling
export const loggedFetch = async (
  url: string,
  options: HttpCallOptions = {},
  context: HttpCallContext
): Promise<Response> => {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = 30000,
    retries = 2,
    retryDelay = 1000,
  } = options;

  const requestLogger = context.logger || logger;
  const startTime = Date.now();

  // Add correlation headers if available
  const enhancedHeaders = {
    ...headers,
    ...(context.requestId && { 'x-request-id': context.requestId }),
    ...(context.traceId && { 'traceparent': `00-${context.traceId}-${generateSpanId()}-01` }),
  };

  const logContext = {
    target: context.target,
    method,
    url: sanitizeUrl(url),
    requestId: context.requestId,
    traceId: context.traceId,
  };

  requestLogger.debug(logContext, `Outbound HTTP request to ${context.target}`);

  let lastError: Error | null = null;
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method,
        headers: enhancedHeaders,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      const durationMs = Date.now() - startTime;
      const responseContext = {
        ...logContext,
        status: response.status,
        durationMs,
        attempt: attempt + 1,
      };

      if (response.ok) {
        requestLogger.info(responseContext, `Successful ${method} request to ${context.target}`);
      } else {
        // Log client errors (4xx) as warnings, server errors (5xx) as errors
        const level = response.status >= 500 ? 'error' : 'warn';
        const shouldLog = level === 'error' || shouldSample(0.1); // Sample 4xx errors

        if (shouldLog) {
          requestLogger[level](responseContext, `HTTP ${response.status} from ${context.target}`);
        }

        // Capture server errors to Sentry
        if (response.status >= 500) {
          const error = new Error(`HTTP ${response.status} from ${context.target}`);
          captureErrorWithContext(error, {
            requestId: context.requestId,
            traceId: context.traceId,
            status: response.status,
            route: context.target,
          });
        }
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const durationMs = Date.now() - startTime;
      
      const errorContext = {
        ...logContext,
        err: lastError,
        durationMs,
        attempt: attempt + 1,
      };

      if (attempt < retries) {
        requestLogger.warn(errorContext, `Request to ${context.target} failed, retrying`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
      } else {
        requestLogger.error(errorContext, `Request to ${context.target} failed after ${retries + 1} attempts`);
        
        // Capture final failure to Sentry
        captureErrorWithContext(lastError, {
          requestId: context.requestId,
          traceId: context.traceId,
          route: context.target,
        });
      }
      
      attempt++;
    }
  }

  throw lastError || new Error(`Request to ${context.target} failed`);
};

// Sanitize URL for logging (remove sensitive query parameters)
const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const sensitiveParams = ['token', 'key', 'secret', 'password', 'api_key', 'access_token'];
    
    sensitiveParams.forEach(param => {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.set(param, '[REDACTED]');
      }
    });
    
    return urlObj.toString();
  } catch {
    // If URL parsing fails, just return the original (might be a relative URL)
    return url;
  }
};

// Generate a random span ID for distributed tracing
const generateSpanId = (): string => {
  return Math.random().toString(16).substring(2, 18).padStart(16, '0');
};

// Database/SDK call wrapper
export const loggedDatabaseCall = async <T>(
  operation: string,
  target: string,
  fn: () => Promise<T>,
  context: { requestId?: string; traceId?: string; logger?: Logger } = {}
): Promise<T> => {
  const requestLogger = context.logger || logger;
  const startTime = Date.now();

  const logContext = {
    operation,
    target,
    requestId: context.requestId,
    traceId: context.traceId,
  };

  requestLogger.debug(logContext, `Database operation: ${operation} on ${target}`);

  try {
    const result = await fn();
    const durationMs = Date.now() - startTime;

    requestLogger.info({ ...logContext, durationMs }, `Successful ${operation} on ${target}`);
    
    return result;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    const durationMs = Date.now() - startTime;

    requestLogger.error(
      { ...logContext, err, durationMs },
      `Database operation failed: ${operation} on ${target}`
    );

    // Capture database errors to Sentry
    captureErrorWithContext(err, {
      requestId: context.requestId,
      traceId: context.traceId,
      route: `db:${target}`,
    });

    throw err;
  }
};

// Generic async operation wrapper with logging
export const loggedOperation = async <T>(
  operationName: string,
  fn: () => Promise<T>,
  context: { requestId?: string; traceId?: string; logger?: Logger } = {}
): Promise<T> => {
  const requestLogger = context.logger || logger;
  const startTime = Date.now();

  const logContext = {
    operation: operationName,
    requestId: context.requestId,
    traceId: context.traceId,
  };

  requestLogger.debug(logContext, `Starting operation: ${operationName}`);

  try {
    const result = await fn();
    const durationMs = Date.now() - startTime;

    requestLogger.info({ ...logContext, durationMs }, `Completed operation: ${operationName}`);
    
    return result;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    const durationMs = Date.now() - startTime;

    requestLogger.error(
      { ...logContext, err, durationMs },
      `Operation failed: ${operationName}`
    );

    // Capture operation errors to Sentry
    captureErrorWithContext(err, {
      requestId: context.requestId,
      traceId: context.traceId,
      route: `operation:${operationName}`,
    });

    throw err;
  }
};

// Rate limiting helper for noisy operations
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const isRateLimited = (key: string, limit: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  entry.count++;
  return entry.count > limit;
};
