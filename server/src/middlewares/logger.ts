import { Request, Response, NextFunction } from "express";

export function logRequests(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  console.log(`${req.method} ${req.path}`);
  next();
}
