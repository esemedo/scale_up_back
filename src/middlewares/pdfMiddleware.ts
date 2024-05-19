import { NextFunction, Request, Response } from "express";

export const pdfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const missingFields = [
    "hourlyPrice",
    "hoursVolume",
    "startDate",
    "endDate",
  ].filter((field) => !data[field]);

  if (missingFields.length > 0) {
    res
      .status(400)
      .send(`missing data for generation: ${missingFields.join(", ")}`);
  } else {
    next();
  }
};
