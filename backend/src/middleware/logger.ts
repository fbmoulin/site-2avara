import { Request, Response, NextFunction } from 'express';

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
} as const;

type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];

function formatLog(level: LogLevel, message: string, meta?: Record<string, unknown>): string {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${metaStr}`;
}

export const logger = {
  error: (message: string, meta?: Record<string, unknown>) => {
    console.error(formatLog(LOG_LEVELS.ERROR, message, meta));
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    console.warn(formatLog(LOG_LEVELS.WARN, message, meta));
  },
  info: (message: string, meta?: Record<string, unknown>) => {
    console.log(formatLog(LOG_LEVELS.INFO, message, meta));
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(formatLog(LOG_LEVELS.DEBUG, message, meta));
    }
  },
};

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = res.statusCode >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO;
    
    const logFn = res.statusCode >= 400 ? logger.error : logger.info;
    logFn(`${req.method} ${req.path}`, {
      requestId,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.socket.remoteAddress,
      userAgent: req.get('user-agent')?.substring(0, 100),
    });
  });

  next();
}

export default logger;
