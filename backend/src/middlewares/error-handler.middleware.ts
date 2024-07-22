import { ErrorRequestHandler, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { config } from "../config/config";

interface ResponseError extends Error {
  status: StatusCodes.INTERNAL_SERVER_ERROR;
  message: ReasonPhrases.INTERNAL_SERVER_ERROR;
}

const ErrorHandler: ErrorRequestHandler = (
  err: ResponseError,
  _req: Request,
  res: Response
) => {
  const errStatus = err.status;
  const errMsg = err.message;

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.env === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
