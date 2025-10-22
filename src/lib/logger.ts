type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

/**
 * Centralized logging utility for consistent application logging.
 * Provides methods for different log levels and can be extended to integrate
 * with external services like Sentry or LogRocket.
 */
class Logger {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Internal logging method that formats and outputs log messages.
   * @param {LogLevel} level - The severity level of the log
   * @param {string} message - The log message
   * @param {LogContext} context - Additional context data
   */
  private log(level: LogLevel, message: string, context?: LogContext) {
    if (!this.isDevelopment && level === 'info') {
      return;
    }

    const timestamp = new Date().toISOString();

    switch (level) {
      case 'error':
        console.error(`[${timestamp}] ERROR:`, message, context);
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

  /**
   * Logs an informational message.
   * @param {string} message - The message to log
   * @param {LogContext} context - Additional context data
   */
  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  /**
   * Logs a warning message.
   * @param {string} message - The message to log
   * @param {LogContext} context - Additional context data
   */
  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  /**
   * Logs an error message with optional error object.
   * @param {string} message - The error message
   * @param {Error | unknown} error - The error object
   * @param {LogContext} context - Additional context data
   */
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

/**
 * Application-wide logger instance.
 */
export const logger = new Logger();

