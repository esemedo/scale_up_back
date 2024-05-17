import { Request, Response } from "express";
import { generatePDF } from "../utils/generatorPDF";

export const generatePdfController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const pdfBuffer = await generatePDF(data);

    res.setHeader("Content-Type", "application/pdf");
    res.end(pdfBuffer);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("une erreur s'est produite lors de la génération du PDF");
  }
};
