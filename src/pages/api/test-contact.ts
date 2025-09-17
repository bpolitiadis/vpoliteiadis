import type { APIRoute } from 'astro';

// Ensure this API route runs server-side, not prerendered
export const prerender = false;

// Placeholder for test contact endpoint
export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({ message: 'Test endpoint' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};