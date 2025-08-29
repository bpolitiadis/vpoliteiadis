import type { MiddlewareHandler } from 'astro';

// Security headers fallback for non-Vercel deployments
export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  const cspDirectives = [
    "default-src 'self'",
    // Allow first-party scripts and inline scripts for public directory scripts
    "script-src 'self' 'unsafe-inline'",
    // Allow inline script elements for public directory scripts
    "script-src-elem 'self' 'unsafe-inline'",
    // Allow inline styles for framework-generated <style> tags; restrict to self + Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Images from self, data uris, and https for social/og
    "img-src 'self' data: https:",
    // Fonts only from self and Google Fonts
    "font-src 'self' https://fonts.gstatic.com",
    // Restrict connections to self (no client-side APIs currently)
    "connect-src 'self'",
    // Disallow embedding
    "frame-ancestors 'none'",
    // Disallow base tag changes
    "base-uri 'self'",
    // Limit form posts to self
    "form-action 'self'",
    // Disallow Flash/Plugins
    "object-src 'none'",
    // Allow only known embeds (Spotify player)
    "frame-src https://open.spotify.com",
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
  return response;
};


