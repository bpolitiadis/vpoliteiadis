import type { APIRoute } from 'astro';
import { loggedOperation } from '../../lib/http-utils.js';

// Ensure this API route runs server-side, not prerendered
export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const logger = locals.logger;
  const { requestId, traceId } = locals.requestContext || {};

  try {
    // Example of using the logging system
    logger?.info('Health check requested');

    // Example of a logged operation
    const healthData = await loggedOperation(
      'health-check',
      async () => {
        // Simulate some health checks
        return {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown',
          environment: process.env.VERCEL_ENV || 'development',
        };
      },
      { requestId, traceId, logger }
    );

    logger?.info({ healthData }, 'Health check completed successfully');

    return new Response(JSON.stringify(healthData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    logger?.error({ err: error }, 'Health check failed');
    
    return new Response(JSON.stringify({ 
      status: 'unhealthy',
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
