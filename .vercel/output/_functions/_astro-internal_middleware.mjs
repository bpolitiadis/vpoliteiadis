import { g as generateRequestId, p as parseTraceparent, a as generateTraceId, c as categorizeUserAgent, h as hashIP, b as createRequestLogger, i as isRateLimited, d as captureErrorWithContext } from './chunks/http-utils_DzliQsYx.mjs';
import './chunks/astro-designed-error-pages_C3fru74C.mjs';
import './chunks/astro/server_oRAxjIhj.mjs';
import 'clsx';
import { s as sequence } from './chunks/index_DRxazUr5.mjs';

const onRequest$1 = async (context, next) => {
  const startTime = Date.now();
  const method = context.request.method;
  const route = context.url.pathname;
  let userAgent = "unknown";
  let clientIP = "unknown";
  let isPrerendering = false;
  {
    isPrerendering = true;
    userAgent = "build";
    clientIP = "build";
  }
  const requestId = generateRequestId();
  const traceId = parseTraceparent() || generateTraceId();
  const requestContext = {
    requestId,
    traceId,
    route,
    method,
    ipHash: hashIP(clientIP),
    userAgentCategory: categorizeUserAgent(userAgent),
    startTime
  };
  const requestLogger = createRequestLogger(requestContext);
  const rateLimitKey = `${requestContext.ipHash}:${route}`;
  const isLimited = isRateLimited(rateLimitKey, 100, 6e4);
  const shouldLogRequest = !isPrerendering && (requestContext.userAgentCategory !== "bot" || !isLimited || context.request.method !== "GET");
  if (shouldLogRequest) {
    requestLogger.info({
      method,
      route,
      userAgentCategory: requestContext.userAgentCategory
    }, `Incoming ${method} request to ${route}`);
  }
  context.locals.requestContext = requestContext;
  context.locals.logger = requestLogger;
  let response;
  let error = null;
  try {
    response = await next();
  } catch (err) {
    error = err instanceof Error ? err : new Error(String(err));
    requestLogger.error({
      err: error,
      durationMs: Date.now() - startTime
    }, `Request processing error for ${method} ${route}`);
    captureErrorWithContext(error, {
      ...requestContext,
      status: 500
    });
    response = new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
  const durationMs = Date.now() - startTime;
  const status = response.status;
  response.headers.set("x-request-id", requestId);
  response.headers.set("x-trace-id", traceId);
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
    "upgrade-insecure-requests"
  ];
  const csp = cspDirectives.join("; ");
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), interest-cohort=()"
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");
  response.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  if (context.url.pathname === "/" || context.url.pathname.endsWith(".html")) {
    response.headers.set("Cache-Control", "public, max-age=0, s-maxage=600, stale-while-revalidate=86400");
  }
  const shouldLogCompletion = !isPrerendering && (shouldLogRequest || status >= 400);
  if (shouldLogCompletion) {
    const logLevel = status >= 500 ? "error" : status >= 400 ? "warn" : "info";
    requestLogger[logLevel]({
      status,
      durationMs,
      method,
      route
    }, `${method} ${route} completed with status ${status} in ${durationMs}ms`);
  }
  if (!isPrerendering && status >= 400 && !error) {
    const shouldCapture = status >= 500 || status >= 400 && requestContext.userAgentCategory !== "bot";
    if (shouldCapture) {
      const httpError = new Error(`HTTP ${status} response for ${method} ${route}`);
      captureErrorWithContext(httpError, {
        ...requestContext,
        status
      });
    }
  }
  return response;
};

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
