import * as Sentry from '@sentry/browser';

// Client-side Sentry initialization (exceptions only, no logging)
export const initClientSentry = (): void => {
  const SENTRY_DSN = import.meta.env.PUBLIC_SENTRY_DSN;
  const NODE_ENV = import.meta.env.MODE;

  if (!SENTRY_DSN) {
    console.warn('Client Sentry DSN not configured');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    
    // Minimal client-side configuration - only exceptions
    tracesSampleRate: 0, // No performance monitoring on client
    profilesSampleRate: 0, // No profiling on client
    
    // Release tracking
    release: import.meta.env.VITE_COMMIT_SHA || import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA,
    
    // Filter out noise
    beforeSend(event, hint) {
      // Only capture actual errors, not warnings or info
      if (event.level && ['warning', 'info', 'debug'].includes(event.level)) {
        return null;
      }
      
      // Skip certain browser-specific errors that aren't actionable
      const error = hint.originalException;
      if (error instanceof Error) {
        const message = error.message.toLowerCase();
        
        // Skip common browser extension errors
        if (message.includes('extension') || 
            message.includes('chrome-extension') ||
            message.includes('moz-extension')) {
          return null;
        }
        
        // Skip network errors that are likely user connectivity issues
        if (message.includes('network error') || 
            message.includes('fetch') ||
            message.includes('load failed')) {
          return null;
        }
      }
      
      return event;
    },
    
    // Minimal integrations for client-side
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    
    // Privacy-focused configuration
    sendDefaultPii: false,
    attachStacktrace: true,
    
    // Performance settings
    maxBreadcrumbs: 10,
  });

  // Set user context if available (without PII)
  const requestId = document.querySelector('meta[name="x-request-id"]')?.getAttribute('content');
  if (requestId) {
    Sentry.setTag('requestId', requestId);
  }
};

// Manual error reporting function for critical client-side errors
export const reportClientError = (error: Error, context?: Record<string, any>): void => {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional', context);
    }
    Sentry.captureException(error);
  });
};
