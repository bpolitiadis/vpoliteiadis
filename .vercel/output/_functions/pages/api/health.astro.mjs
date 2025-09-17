import { l as loggedOperation } from '../../chunks/http-utils_DzliQsYx.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ locals }) => {
  const logger = locals.logger;
  const { requestId, traceId } = locals.requestContext || {};
  try {
    logger?.info("Health check requested");
    const healthData = await loggedOperation(
      "health-check",
      async () => {
        return {
          status: "healthy",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || "unknown",
          environment: process.env.VERCEL_ENV || "development"
        };
      },
      { requestId, traceId, logger }
    );
    logger?.info({ healthData }, "Health check completed successfully");
    return new Response(JSON.stringify(healthData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    logger?.error({ err: error }, "Health check failed");
    return new Response(JSON.stringify({
      status: "unhealthy",
      error: "Internal server error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
