import { ErrorRequestHandler, RequestHandler } from "express";

import status from "http-status";
import postgres from "postgres";

const unexpectedRequest: RequestHandler = (req, res) => {
  res.status(status.NOT_FOUND).json({
    statusCode: status.NOT_FOUND,
    error: status[status.NOT_FOUND],
    message: `Route ${req.method}:${req.url} not found`,
  });
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof postgres.PostgresError) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      code: err.code,
      error: status[status.INTERNAL_SERVER_ERROR],
      message: err.message,
      detail: err.detail,
    });
  } else if (err instanceof Error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      error: status[status.INTERNAL_SERVER_ERROR],
      message: err.message || "An unexpected error occurred",
      detail: err.name,
    });
  } else {
    res.locals.err = err;
  }
  next(err);
};

export default () => [unexpectedRequest, addErrorToRequestLog];
