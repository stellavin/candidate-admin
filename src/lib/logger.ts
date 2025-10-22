/**
 * Centralized logging utility
 * In production, this could be connected to a service like Sentry, LogRocket, etc.
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, message: string, context?: LogContext) {
    if (!this.isDevelopment && level === 'info') {
      // Skip info logs in production
      return;
    }

    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...context,
    };

    switch (level) {
      case 'error':
        console.error(`[${timestamp}] ERROR:`, message, context);
        // In production, send to error tracking service
        // this.sendToErrorService(logData);
        break;
      case 'warn':
        console.warn(`[${timestamp}] WARN:`, message, context);
        break;
      case 'info':
      default:
        console.log(`[${timestamp}] INFO:`, message, context);
        break;
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
    };
    this.log('error', message, errorContext);
  }
}

export const logger = new Logger();

