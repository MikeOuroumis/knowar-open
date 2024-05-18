import { Request, Response, NextFunction } from "express";

export function logRequests(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.path}`);

  next();
}
