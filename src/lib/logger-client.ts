/**
 * Client-side logging utility for production-safe logging
 * Only logs in development mode to avoid console pollution in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class ClientLogger {
  private isDevelopment = import.meta.env.MODE === 'development';
  private isProduction = import.meta.env.MODE === 'production';

  private shouldLog(level: LogLevel): boolean {
    // Always log errors, even in production
    if (level === 'error') return true;
    
    // Only log other levels in development
    return this.isDevelopment;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    if (context && Object.keys(context).length > 0) {
      return `${prefix} ${message} ${JSON.stringify(context, null, 2)}`;
    }
    
    return `${prefix} ${message}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, context?: LogContext): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context));
    }
  }

  // Convenience method for component lifecycle logging
  component(componentName: string, action: string, context?: LogContext): void {
    this.debug(`[${componentName}] ${action}`, context);
  }

  // Convenience method for animation/sequence logging
  animation(animationName: string, step: string, context?: LogContext): void {
    this.debug(`🎯 [${animationName}] ${step}`, context);
  }
}

// Export singleton instance
export const clientLogger = new ClientLogger();

// Export individual methods for convenience
export const { debug, info, warn, error, component, animation } = clientLogger;

// Export for use in components
export default clientLogger;
