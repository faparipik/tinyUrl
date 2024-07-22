import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import { config } from "../config/config";

interface ResponseError extends Error {
  status: number;
  message: string;
}

const ErrorHandler: ErrorRequestHandler = (
  err: ResponseError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let errStatus = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const errMsg = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  if (err instanceof ZodError) {
    errStatus = StatusCodes.UNPROCESSABLE_ENTITY;
  }

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.env === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
