import pino from 'pino';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import type { Logger } from 'pino';

// Environment variables for logging configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const VERCEL_ENV = process.env.VERCEL_ENV || NODE_ENV;
const LOG_LEVEL = process.env.LOG_LEVEL || (NODE_ENV === 'production' ? 'info' : 'debug');
const COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA;
const DEPLOYED_AT = process.env.VERCEL_DEPLOYMENT_URL ? new Date().toISOString() : undefined;

// Redaction configuration for sensitive data
const REDACTION_PATHS = [
  'authorization',
  'cookie',
  'password',
  'email',
  'phone',
  'token',
  'secret',
  'key',
  // Nested redaction paths
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["set-cookie"]',
  'req.headers["x-api-key"]',
  'res.headers["set-cookie"]',
  'body.password',
  'body.email',
  'body.phone',
  'query.token',
  'query.key',
  // Additional custom paths from environment
  ...(process.env.REDACTION_EXTRA_KEYS?.split(',').filter(Boolean) || []),
];

// Base logger configuration
const baseLoggerConfig = {
  level: LOG_LEVEL,
  base: {
    service: 'web',
    env: NODE_ENV,
    vercelEnv: VERCEL_ENV,
    ...(COMMIT_SHA && { commitSha: COMMIT_SHA }),
    ...(DEPLOYED_AT && { deployedAt: DEPLOYED_AT }),
  },
  redact: {
    paths: REDACTION_PATHS,
    censor: '[REDACTED]',
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: (req: any) => ({
      method: req.method,
      url: req.url,
      headers: req.headers,
      // Only log content-length and type, not raw body
      contentLength: req.headers?.['content-length'],
      contentType: req.headers?.['content-type'],
    }),
    res: (res: any) => ({
      statusCode: res.statusCode,
      headers: res.headers,
    }),
  },
  formatters: {
    level: (label: string) => ({ level: label }),
  },
};

// Development logger with pretty printing
const createDevLogger = (): Logger => {
  return pino({
    ...baseLoggerConfig,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        levelFirst: true,
        messageFormat: '{service}[{requestId}] {msg}',
      },
    },
  });
};

// Production logger with JSON output to stdout
const createProdLogger = (): Logger => {
  return pino({
    ...baseLoggerConfig,
    timestamp: pino.stdTimeFunctions.isoTime,
  });
};

// Main logger instance
export const logger: Logger = NODE_ENV === 'development' ? createDevLogger() : createProdLogger();

// Request context interface
export interface RequestContext {
  requestId: string;
  traceId: string;
  route: string;
  method: string;
  ipHash: string;
  userAgentCategory: string;
  startTime: number;
}

// Utility functions
export const generateRequestId = (): string => uuidv4();

export const generateTraceId = (): string => uuidv4().replace(/-/g, '');

export const hashIP = (ip: string): string => {
  return createHash('sha256').update(ip).digest('hex').substring(0, 16);
};

export const categorizeUserAgent = (userAgent: string): string => {
  const ua = userAgent.toLowerCase();
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    return 'bot';
  }
  if (ua.includes('mobile')) {
    return 'mobile';
  }
  if (ua.includes('tablet')) {
    return 'tablet';
  }
  return 'desktop';
};

// Parse W3C traceparent header
export const parseTraceparent = (traceparent: string | null): string | null => {
  if (!traceparent) return null;
  
  try {
    const parts = traceparent.split('-');
    if (parts.length >= 2) {
      return parts[1]; // Return trace-id
    }
  } catch {
    // Invalid traceparent, ignore
  }
  
  return null;
};

// Create request-scoped child logger
export const createRequestLogger = (context: RequestContext): Logger => {
  return logger.child({
    requestId: context.requestId,
    traceId: context.traceId,
    route: context.route,
    method: context.method,
    ipHash: context.ipHash,
    userAgentCategory: context.userAgentCategory,
  });
};

// Sampling utility for noisy logs
export const shouldSample = (sampleRate: number = 0.1): boolean => {
  return Math.random() < sampleRate;
};

// Log levels for different scenarios
export const LOG_LEVELS = {
  TRACE: 10,
  DEBUG: 20,
  INFO: 30,
  WARN: 40,
  ERROR: 50,
  FATAL: 60,
} as const;

export type LogLevel = keyof typeof LOG_LEVELS;

// Export types
export type { Logger };
