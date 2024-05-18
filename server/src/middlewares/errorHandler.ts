import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  const statusCode = err.name === "ValidationError" ? 400 : 500;

  res.status(statusCode).send({
    status: "error",
    message: err.message,
  });
};
