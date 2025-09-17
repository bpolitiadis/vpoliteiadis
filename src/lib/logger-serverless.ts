// Serverless-compatible logger that doesn't use Node.js-specific APIs
export interface RequestContext {
  requestId: string;
  traceId: string;
  route: string;
  method: string;
  ipHash: string;
  userAgentCategory: string;
  startTime: number;
}

export interface Logger {
  info: (obj: any, msg?: string) => void;
  warn: (obj: any, msg?: string) => void;
  error: (obj: any, msg?: string) => void;
  debug: (obj: any, msg?: string) => void;
}

// Simple console-based logger for serverless environments
class ServerlessLogger implements Logger {
  private context: RequestContext;

  constructor(context: RequestContext) {
    this.context = context;
  }

  private formatMessage(level: string, obj: any, msg?: string): string {
    const timestamp = new Date().toISOString();
    const contextStr = `[${this.context.requestId}] [${this.context.traceId}]`;
    const levelStr = `[${level.toUpperCase()}]`;
    const message = msg || '';
    const data = obj ? ` ${JSON.stringify(obj)}` : '';
    
    return `${timestamp} ${contextStr} ${levelStr} ${message}${data}`;
  }

  info(obj: any, msg?: string): void {
    console.log(this.formatMessage('info', obj, msg));
  }

  warn(obj: any, msg?: string): void {
    console.warn(this.formatMessage('warn', obj, msg));
  }

  error(obj: any, msg?: string): void {
    console.error(this.formatMessage('error', obj, msg));
  }

  debug(obj: any, msg?: string): void {
    console.debug(this.formatMessage('debug', obj, msg));
  }
}

// Utility functions
export const generateRequestId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const generateTraceId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const parseTraceparent = (traceparent: string | null): string | null => {
  if (!traceparent) return null;
  const parts = traceparent.split('-');
  return parts.length >= 2 ? parts[1] : null;
};

export const hashIP = async (ip: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
};

export const categorizeUserAgent = (userAgent: string): string => {
  const ua = userAgent.toLowerCase();
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    return 'bot';
  }
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  return 'desktop';
};

export const createRequestLogger = (context: RequestContext): Logger => {
  return new ServerlessLogger(context);
};

// Global logger for non-request-specific logging
export const logger: Logger = {
  info: (obj: any, msg?: string) => console.log(`[INFO] ${msg || ''} ${obj ? JSON.stringify(obj) : ''}`),
  warn: (obj: any, msg?: string) => console.warn(`[WARN] ${msg || ''} ${obj ? JSON.stringify(obj) : ''}`),
  error: (obj: any, msg?: string) => console.error(`[ERROR] ${msg || ''} ${obj ? JSON.stringify(obj) : ''}`),
  debug: (obj: any, msg?: string) => console.debug(`[DEBUG] ${msg || ''} ${obj ? JSON.stringify(obj) : ''}`),
};
