import * as Sentry from '@sentry/node';
import type { RequestContext } from './logger.js';
import { logger } from './logger.js';

// Environment configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV || NODE_ENV;
const SENTRY_TRACES_SAMPLE_RATE = parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1');

// Initialize Sentry for server-side only
export const initSentry = (): void => {
  if (!SENTRY_DSN) {
    logger.warn('Sentry DSN not configured, error tracking disabled');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
    
    // Performance monitoring
    profilesSampleRate: NODE_ENV === 'production' ? 0.05 : 0,
    
    // Release tracking
    release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA,
    
    // Disable client-side features for server-only usage
    autoSessionTracking: false,
    sendClientReports: false,
    
    // Filter out common noise
    beforeSend(event, hint) {
      // Skip certain error types that are not actionable
      const error = hint.originalException;
      if (error instanceof Error) {
        // Skip client disconnection errors
        if (error.message?.includes('ECONNRESET') || error.message?.includes('EPIPE')) {
          return null;
        }
        
        // Skip 4xx errors from bots (unless it's a 403/401 which might indicate attacks)
        if (event.tags?.route && event.tags?.status) {
          const status = parseInt(event.tags.status as string);
          const userAgent = event.tags?.userAgentCategory as string;
          if (userAgent === 'bot' && status >= 400 && status < 500 && status !== 401 && status !== 403) {
            return null;
          }
        }
      }
      
      return event;
    },
    
    // Enhanced error context
    integrations: [
      Sentry.httpIntegration(),
      Sentry.nodeContextIntegration(),
      Sentry.consoleIntegration(),
    ],
  });

  logger.info({ 
    environment: SENTRY_ENV, 
    tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE 
  }, 'Sentry initialized');
};

// Capture error with request context
export const captureErrorWithContext = (
  error: Error,
  context?: Partial<RequestContext & { status?: number; route?: string }>
): string => {
  return Sentry.withScope((scope) => {
    // Add request context as tags for better filtering
    if (context?.requestId) {
      scope.setTag('requestId', context.requestId);
    }
    if (context?.traceId) {
      scope.setTag('traceId', context.traceId);
    }
    if (context?.route) {
      scope.setTag('route', context.route);
    }
    if (context?.method) {
      scope.setTag('method', context.method);
    }
    if (context?.status) {
      scope.setTag('status', context.status.toString());
    }
    if (context?.userAgentCategory) {
      scope.setTag('userAgentCategory', context.userAgentCategory);
    }
    
    // Add context as extra data
    scope.setContext('request', {
      requestId: context?.requestId,
      traceId: context?.traceId,
      route: context?.route,
      method: context?.method,
      ipHash: context?.ipHash,
      userAgentCategory: context?.userAgentCategory,
    });
    
    return Sentry.captureException(error);
  });
};

// Capture message with context
export const captureMessageWithContext = (
  message: string,
  level: Sentry.SeverityLevel = 'warning',
  context?: Partial<RequestContext>
): string => {
  return Sentry.withScope((scope) => {
    if (context?.requestId) {
      scope.setTag('requestId', context.requestId);
    }
    if (context?.traceId) {
      scope.setTag('traceId', context.traceId);
    }
    
    scope.setContext('request', context || {});
    
    return Sentry.captureMessage(message, level);
  });
};

// Global error handler for uncaught exceptions
export const setupGlobalErrorHandling = (): void => {
  // Handle uncaught exceptions
  process.on('uncaughtException', (error: Error) => {
    logger.fatal({ err: error }, 'Uncaught exception');
    captureErrorWithContext(error);
    
    // Give Sentry time to send the error before exiting
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logger.fatal({ err: error, promise }, 'Unhandled promise rejection');
    captureErrorWithContext(error);
  });

  // Handle graceful shutdown
  const gracefulShutdown = (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully`);
    
    Sentry.close(2000).then(() => {
      logger.info('Sentry client closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

// Initialize Sentry and global error handling
initSentry();
setupGlobalErrorHandling();
