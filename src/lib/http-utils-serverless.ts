// Serverless-compatible HTTP utilities
export interface HttpCallOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData | URLSearchParams;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface HttpCallContext {
  target: string;
  requestId?: string;
  traceId?: string;
  logger?: any;
}

// Simple rate limiting without external dependencies
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const isRateLimited = (key: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (record.count >= maxRequests) {
    return true;
  }
  
  record.count++;
  return false;
};

// Simple HTTP client for serverless environments
export const httpCall = async (
  url: string,
  options: HttpCallOptions = {},
  context?: HttpCallContext
): Promise<Response> => {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = 10000,
    retries = 3,
    retryDelay = 1000,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (retries > 0 && error instanceof Error && error.name === 'AbortError') {
      // Retry on timeout
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return httpCall(url, { ...options, retries: retries - 1 }, context);
    }
    
    throw error;
  }
};

// Simple logged operation wrapper
export const loggedOperation = async <T>(
  operationName: string,
  operation: () => Promise<T>,
  context?: { requestId?: string; traceId?: string; logger?: any }
): Promise<T> => {
  const startTime = Date.now();
  
  try {
    const result = await operation();
    const duration = Date.now() - startTime;
    
    if (context?.logger) {
      context.logger.info({
        operation: operationName,
        duration,
        success: true,
      }, `Operation ${operationName} completed successfully`);
    } else {
      console.log(`Operation ${operationName} completed successfully in ${duration}ms`);
    }
    
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    if (context?.logger) {
      context.logger.error({
        operation: operationName,
        duration,
        error: error instanceof Error ? error.message : String(error),
        success: false,
      }, `Operation ${operationName} failed`);
    } else {
      console.error(`Operation ${operationName} failed after ${duration}ms:`, error);
    }
    
    throw error;
  }
};
