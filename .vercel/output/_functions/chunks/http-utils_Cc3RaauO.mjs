import pino from 'pino';
import { createHash } from 'crypto';
import { v4 } from 'uuid';
import * as Sentry from '@sentry/node';

const NODE_ENV$1 = process.env.NODE_ENV || "development";
const VERCEL_ENV = process.env.VERCEL_ENV || NODE_ENV$1;
const LOG_LEVEL = process.env.LOG_LEVEL || (NODE_ENV$1 === "production" ? "info" : "debug");
const COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA;
const DEPLOYED_AT = process.env.VERCEL_DEPLOYMENT_URL ? (/* @__PURE__ */ new Date()).toISOString() : void 0;
const REDACTION_PATHS = [
  "authorization",
  "cookie",
  "password",
  "email",
  "phone",
  "token",
  "secret",
  "key",
  // Nested redaction paths
  "req.headers.authorization",
  "req.headers.cookie",
  'req.headers["set-cookie"]',
  'req.headers["x-api-key"]',
  'res.headers["set-cookie"]',
  "body.password",
  "body.email",
  "body.phone",
  "query.token",
  "query.key",
  // Additional custom paths from environment
  ...process.env.REDACTION_EXTRA_KEYS?.split(",").filter(Boolean) || []
];
const baseLoggerConfig = {
  level: LOG_LEVEL,
  base: {
    service: "web",
    env: NODE_ENV$1,
    vercelEnv: VERCEL_ENV,
    ...COMMIT_SHA && { commitSha: COMMIT_SHA },
    ...DEPLOYED_AT && { deployedAt: DEPLOYED_AT }
  },
  redact: {
    paths: REDACTION_PATHS,
    censor: "[REDACTED]"
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: req.headers,
      // Only log content-length and type, not raw body
      contentLength: req.headers?.["content-length"],
      contentType: req.headers?.["content-type"]
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      headers: res.headers
    })
  },
  formatters: {
    level: (label) => ({ level: label })
  }
};
const createDevLogger = () => {
  return pino({
    ...baseLoggerConfig,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        levelFirst: true,
        messageFormat: "{service}[{requestId}] {msg}"
      }
    }
  });
};
const createProdLogger = () => {
  return pino({
    ...baseLoggerConfig,
    timestamp: pino.stdTimeFunctions.isoTime
  });
};
const logger = NODE_ENV$1 === "development" ? createDevLogger() : createProdLogger();
const generateRequestId = () => v4();
const generateTraceId = () => v4().replace(/-/g, "");
const hashIP = (ip) => {
  return createHash("sha256").update(ip).digest("hex").substring(0, 16);
};
const categorizeUserAgent = (userAgent) => {
  const ua = userAgent.toLowerCase();
  if (ua.includes("bot") || ua.includes("crawler") || ua.includes("spider")) {
    return "bot";
  }
  if (ua.includes("mobile")) {
    return "mobile";
  }
  if (ua.includes("tablet")) {
    return "tablet";
  }
  return "desktop";
};
const parseTraceparent = (traceparent) => {
  return null;
};
const createRequestLogger = (context) => {
  return logger.child({
    requestId: context.requestId,
    traceId: context.traceId,
    route: context.route,
    method: context.method,
    ipHash: context.ipHash,
    userAgentCategory: context.userAgentCategory
  });
};

const NODE_ENV = process.env.NODE_ENV || "development";
const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV || NODE_ENV;
const SENTRY_TRACES_SAMPLE_RATE = parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || "0.1");
const initSentry = () => {
  if (!SENTRY_DSN) {
    logger.warn("Sentry DSN not configured, error tracking disabled");
    return;
  }
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
    // Performance monitoring
    profilesSampleRate: NODE_ENV === "production" ? 0.05 : 0,
    // Release tracking
    release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA,
    // Disable client-side features for server-only usage
    autoSessionTracking: false,
    sendClientReports: false,
    // Filter out common noise
    beforeSend(event, hint) {
      const error = hint.originalException;
      if (error instanceof Error) {
        if (error.message?.includes("ECONNRESET") || error.message?.includes("EPIPE")) {
          return null;
        }
        if (event.tags?.route && event.tags?.status) {
          const status = parseInt(event.tags.status);
          const userAgent = event.tags?.userAgentCategory;
          if (userAgent === "bot" && status >= 400 && status < 500 && status !== 401 && status !== 403) {
            return null;
          }
        }
      }
      return event;
    },
    // Enhanced error context
    integrations: [
      Sentry.httpIntegration(),
      Sentry.nodeContextIntegration(),
      Sentry.consoleIntegration()
    ]
  });
  logger.info({
    environment: SENTRY_ENV,
    tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE
  }, "Sentry initialized");
};
const captureErrorWithContext = (error, context) => {
  return Sentry.withScope((scope) => {
    if (context?.requestId) {
      scope.setTag("requestId", context.requestId);
    }
    if (context?.traceId) {
      scope.setTag("traceId", context.traceId);
    }
    if (context?.route) {
      scope.setTag("route", context.route);
    }
    if (context?.method) {
      scope.setTag("method", context.method);
    }
    if (context?.status) {
      scope.setTag("status", context.status.toString());
    }
    if (context?.userAgentCategory) {
      scope.setTag("userAgentCategory", context.userAgentCategory);
    }
    scope.setContext("request", {
      requestId: context?.requestId,
      traceId: context?.traceId,
      route: context?.route,
      method: context?.method,
      ipHash: context?.ipHash,
      userAgentCategory: context?.userAgentCategory
    });
    return Sentry.captureException(error);
  });
};
const setupGlobalErrorHandling = () => {
  process.on("uncaughtException", (error) => {
    logger.fatal({ err: error }, "Uncaught exception");
    captureErrorWithContext(error);
    setTimeout(() => {
      process.exit(1);
    }, 2e3);
  });
  process.on("unhandledRejection", (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logger.fatal({ err: error, promise }, "Unhandled promise rejection");
    captureErrorWithContext(error);
  });
  const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal}, shutting down gracefully`);
    Sentry.close(2e3).then(() => {
      logger.info("Sentry client closed");
      process.exit(0);
    });
  };
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};
initSentry();
setupGlobalErrorHandling();

const loggedOperation = async (operationName, fn, context = {}) => {
  const requestLogger = context.logger || logger;
  const startTime = Date.now();
  const logContext = {
    operation: operationName,
    requestId: context.requestId,
    traceId: context.traceId
  };
  requestLogger.debug(logContext, `Starting operation: ${operationName}`);
  try {
    const result = await fn();
    const durationMs = Date.now() - startTime;
    requestLogger.info({ ...logContext, durationMs }, `Completed operation: ${operationName}`);
    return result;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    const durationMs = Date.now() - startTime;
    requestLogger.error(
      { ...logContext, err, durationMs },
      `Operation failed: ${operationName}`
    );
    captureErrorWithContext(err, {
      requestId: context.requestId,
      traceId: context.traceId,
      route: `operation:${operationName}`
    });
    throw err;
  }
};
const rateLimitMap = /* @__PURE__ */ new Map();
const isRateLimited = (key, limit = 10, windowMs = 6e4) => {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  entry.count++;
  return entry.count > limit;
};

export { generateTraceId as a, createRequestLogger as b, categorizeUserAgent as c, captureErrorWithContext as d, generateRequestId as g, hashIP as h, isRateLimited as i, loggedOperation as l, parseTraceparent as p };
