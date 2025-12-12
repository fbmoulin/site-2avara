import { Request, Response, NextFunction } from 'express';

const DEFAULT_TIMEOUT = 30000;

export function requestTimeout(timeout: number = DEFAULT_TIMEOUT) {
  return (req: Request, res: Response, next: NextFunction) => {
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        res.status(504).json({
          success: false,
          message: 'A requisição demorou muito tempo. Por favor, tente novamente.',
          code: 'REQUEST_TIMEOUT',
        });
      }
    }, timeout);

    res.on('finish', () => {
      clearTimeout(timeoutId);
    });

    res.on('close', () => {
      clearTimeout(timeoutId);
    });

    next();
  };
}

export const apiTimeout = requestTimeout(30000);
export const chatTimeout = requestTimeout(60000);
