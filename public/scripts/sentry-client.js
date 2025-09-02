// Client-side Sentry initialization for browser error tracking only
// This file should be loaded in the browser to capture client-side exceptions

(function() {
  // Only initialize if Sentry DSN is configured
  const sentryDsn = document.querySelector('meta[name="sentry-dsn"]')?.getAttribute('content');
  if (!sentryDsn) {
    return;
  }

  // Import Sentry dynamically to avoid blocking page load
  import('https://browser.sentry-cdn.com/8.45.0/bundle.tracing.min.js')
    .then(function(Sentry) {
      Sentry.init({
        dsn: sentryDsn,
        environment: document.querySelector('meta[name="environment"]')?.getAttribute('content') || 'production',
        
        // Minimal client configuration - exceptions only
        tracesSampleRate: 0,
        profilesSampleRate: 0,
        
        // Privacy-focused
        sendDefaultPii: false,
        attachStacktrace: true,
        maxBreadcrumbs: 5,
        
        // Filter out noise
        beforeSend: function(event, hint) {
          // Only capture actual errors
          if (event.level && ['warning', 'info', 'debug'].includes(event.level)) {
            return null;
          }
          
          // Skip browser extension errors
          const error = hint.originalException;
          if (error && error.message) {
            const message = error.message.toLowerCase();
            if (message.includes('extension') || 
                message.includes('chrome-extension') ||
                message.includes('moz-extension') ||
                message.includes('network error') ||
                message.includes('load failed')) {
              return null;
            }
          }
          
          return event;
        }
      });

      // Set request correlation if available
      const requestId = document.querySelector('meta[name="x-request-id"]')?.getAttribute('content');
      if (requestId) {
        Sentry.setTag('requestId', requestId);
      }

      console.debug('Client Sentry initialized');
    })
    .catch(function(error) {
      console.warn('Failed to load Sentry:', error);
    });
})();
