import type { MiddlewareHandler } from 'astro';
import { 
  generateRequestId, 
  generateTraceId, 
  parseTraceparent, 
  hashIP, 
  categorizeUserAgent, 
  createRequestLogger,
  type RequestContext 
} from './lib/logger-serverless.js';
import { captureErrorWithContext } from './lib/sentry.js';
import { isRateLimited } from './lib/http-utils-serverless.js';

// Security headers fallback for non-Vercel deployments + Request correlation
export const onRequest: MiddlewareHandler = async (context, next) => {
  const startTime = Date.now();
  
  // Extract request information
  const method = context.request.method;
  const route = context.url.pathname;
  
  // During build/prerender, skip header access to avoid warnings
  const isBuildTime = import.meta.env.PROD;
  
  let userAgent = 'unknown';
  let clientIP = 'unknown';
  let existingRequestId: string | null = null;
  let traceparentHeader: string | null = null;
  let isPrerendering = false;
  
  if (!isBuildTime) {
    // Only access headers during development/runtime
    try {
      userAgent = context.request.headers.get('user-agent') || 'unknown';
      existingRequestId = context.request.headers.get('x-request-id');
      traceparentHeader = context.request.headers.get('traceparent');
      
      clientIP = context.clientAddress || 
        context.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        context.request.headers.get('x-real-ip') ||
        'unknown';
    } catch (_e) {
      // Fallback for any errors
      userAgent = 'unknown';
      clientIP = 'unknown';
    }
  } else {
    // Build time - use static values
    isPrerendering = true;
    userAgent = 'build';
    clientIP = 'build';
  }
  
  const requestId = existingRequestId || generateRequestId();
  const traceId = parseTraceparent(traceparentHeader) || generateTraceId();

  // Create request context
  const requestContext: RequestContext = {
    requestId,
    traceId,
    route,
    method,
    ipHash: await hashIP(clientIP),
    userAgentCategory: categorizeUserAgent(userAgent),
    startTime,
  };

  // Create request-scoped logger
  const requestLogger = createRequestLogger(requestContext);

  // Rate limiting for noisy bot requests
  const rateLimitKey = `${requestContext.ipHash}:${route}`;
  const isLimited = isRateLimited(rateLimitKey, 100, 60000); // 100 requests per minute

  // Log request start (sample bot requests to reduce noise, skip during prerendering)
  const shouldLogRequest = !isPrerendering && (
    requestContext.userAgentCategory !== 'bot' || 
    !isLimited || 
    context.request.method !== 'GET'
  );

  if (shouldLogRequest) {
    requestLogger.info({
      method,
      route,
      userAgentCategory: requestContext.userAgentCategory,
    }, `Incoming ${method} request to ${route}`);
  }

  // Store context for potential use in pages/components
  context.locals.requestContext = requestContext;
  context.locals.logger = requestLogger;

  let response: Response;
  let error: Error | null = null;

  try {
    response = await next();
  } catch (err) {
    error = err instanceof Error ? err : new Error(String(err));
    
    // Log error and capture to Sentry
    requestLogger.error({
      err: error,
      durationMs: Date.now() - startTime,
    }, `Request processing error for ${method} ${route}`);

    captureErrorWithContext(error, {
      ...requestContext,
      status: 500,
    });

    // Return a clean error response
    response = new Response('Internal Server Error', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // Calculate request duration
  const durationMs = Date.now() - startTime;
  const status = response.status;

  // Add correlation headers to response
  response.headers.set('x-request-id', requestId);
  response.headers.set('x-trace-id', traceId);

  // Security headers (existing functionality preserved)
  const cspDirectives = [
    "default-src 'self'",
    // Allow first-party scripts, inline scripts, and Vercel live feedback
    "script-src 'self' 'unsafe-inline' https://vercel.live",
    // Allow inline script elements and Vercel live feedback
    "script-src-elem 'self' 'unsafe-inline' https://vercel.live",
    // Allow inline styles for framework-generated <style> tags; restrict to self + Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Images from self, data uris, and https for social/og
    "img-src 'self' data: https:",
    // Fonts only from self and Google Fonts
    "font-src 'self' https://fonts.gstatic.com",
    // Allow connections to self and Vercel live feedback
    "connect-src 'self' https://vercel.live",
    // Disallow embedding
    "frame-ancestors 'none'",
    // Disallow base tag changes
    "base-uri 'self'",
    // Limit form posts to self
    "form-action 'self'",
    // Disallow Flash/Plugins
    "object-src 'none'",
    // Allow only known embeds (Spotify player and Vercel Live)
    "frame-src https://open.spotify.com https://vercel.live",
    // Enforce HTTPS for subresources
    'upgrade-insecure-requests',
  ];
  const csp = cspDirectives.join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Limit referrer leakage
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // HSTS for HTTPS environments
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), interest-cohort=()'
  );
  // Cross-origin policies tuned for a static site with external fonts/images
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

  // Ensure caching is reasonable on HTML; assets are handled by platform headers
  if (context.url.pathname === '/' || context.url.pathname.endsWith('.html')) {
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  }

  // Log request completion (with sampling for bots and successful requests, skip during prerendering)
  const shouldLogCompletion = !isPrerendering && (shouldLogRequest || status >= 400);
  
  if (shouldLogCompletion) {
    const logLevel = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
    requestLogger[logLevel]({
      status,
      durationMs,
      method,
      route,
    }, `${method} ${route} completed with status ${status} in ${durationMs}ms`);
  }

  // Capture 4xx/5xx responses to Sentry (with sampling, skip during prerendering)
  if (!isPrerendering && status >= 400 && !error) { // Don't double-capture if we already caught an error above
    const shouldCapture = status >= 500 || (status >= 400 && requestContext.userAgentCategory !== 'bot');
    
    if (shouldCapture) {
      const httpError = new Error(`HTTP ${status} response for ${method} ${route}`);
      captureErrorWithContext(httpError, {
        ...requestContext,
        status,
      });
    }
  }

  return response;
};


