import './chunks/astro-designed-error-pages_Bubiypbe.mjs';
import './chunks/astro/server_cglaCLgn.mjs';
import 'clsx';
import { s as sequence } from './chunks/index_BJmCjd1G.mjs';

const onRequest$1 = async (context, next) => {
  const startTime = Date.now();
  let response;
  let error = null;
  try {
    response = await next();
  } catch (err) {
    error = err instanceof Error ? err : new Error(String(err));
    console.error("Request processing error:", error);
    response = new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
  const durationMs = Date.now() - startTime;
  const status = response.status;
  response.headers.set("x-request-id", Math.random().toString(36).substring(2, 15));
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;");
  console.log(`${context.request.method} ${context.url.pathname} - ${status} - ${durationMs}ms`);
  return response;
};

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
