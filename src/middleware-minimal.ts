import type { MiddlewareHandler } from 'astro';

// Minimal middleware for testing
export const onRequest: MiddlewareHandler = async (context, next) => {
  const startTime = Date.now();
  
  // Extract request information
  const method = context.request.method;
  const route = context.url.pathname;
  
  let response: Response;
  let error: Error | null = null;

  try {
    response = await next();
  } catch (err) {
    error = err instanceof Error ? err : new Error(String(err));
    
    // Return a clean error response
    response = new Response('Internal Server Error', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // Calculate request duration
  const durationMs = Date.now() - startTime;
  const status = response.status;

  // Add basic headers
  response.headers.set('X-Request-ID', Math.random().toString(36).substring(2, 15));

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
};
