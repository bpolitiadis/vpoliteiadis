import type { MiddlewareHandler } from 'astro';

// Simple, working middleware - no external dependencies
export const onRequest: MiddlewareHandler = async (context, next) => {
  const startTime = Date.now();
  
  let response: Response;
  let error: Error | null = null;

  try {
    response = await next();
  } catch (err) {
    error = err instanceof Error ? err : new Error(String(err));
    
    // Log error
    console.error('Request processing error:', error);
    
    // Return a clean error response
    response = new Response('Internal Server Error', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // Calculate request duration
  const durationMs = Date.now() - startTime;
  const status = response.status;

  // Add basic correlation headers
  response.headers.set('x-request-id', Math.random().toString(36).substring(2, 15));

  // Essential security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Advanced caching strategy
  const pathname = context.url.pathname;

  // Static assets - long-term cache (1 year)
  if (pathname.startsWith('/_astro/') || pathname.match(/\.(css|js|woff2?|png|jpg|jpeg|webp|avif|svg)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Images - medium cache with revalidation (24 hours + stale-while-revalidate)
  else if (pathname.startsWith('/images/') || pathname.match(/\.(png|jpg|jpeg|webp|avif|svg)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  }
  // API routes - no cache
  else if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  // HTML pages - short cache for content updates
  else if (!pathname.includes('.')) {
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  }

  // Minimal, compatible CSP for this site (avoid over-restricting external fonts)
  // - Allow Google Fonts stylesheets
  // - Keep inline scripts/styles for Astro hydration
  // - Allow images from HTTPS and data URIs
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.vercel-insights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    // Frame Spotify embeds
    "frame-src https://open.spotify.com"
  ].join('; ');
  response.headers.set('Content-Security-Policy', csp);

  // Log request completion
  console.log(`${context.request.method} ${context.url.pathname} - ${status} - ${durationMs}ms`);

  return response;
};