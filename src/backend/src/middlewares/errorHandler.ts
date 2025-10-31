import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const isZodError = typeof err === 'object' && err !== null && 'issues' in (err as any);
  if (isZodError) {
    return res.status(400).json({ error: 'ValidationError', details: (err as any).issues });
  }
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  const status = (err as any)?.status || 500;
  res.status(status).json({ error: message });
}


