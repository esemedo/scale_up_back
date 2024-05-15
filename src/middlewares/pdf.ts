import { NextFunction, Request, Response } from "express";

export const pdfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  console.log("données reçues pour la génération du PDF :", data);

  const missingFields = [
    "hourlyPrice",
    "hoursVolume",
    "startDate",
    "endDate",
  ].filter((field) => !data[field]);

  if (missingFields.length > 0) {
    console.log("champs manquants pour la génération du PDF :", missingFields);
    res
      .status(400)
      .send(`missing data for generation: ${missingFields.join(", ")}`);
  } else {
    console.log("données valides pour la génération du PDF");
    next();
  }
};
