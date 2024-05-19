import express from "express";
import { generatePdfController } from "../controllers/PdfController";
import { pdfMiddleware } from "../middlewares/pdfMiddleware";

const router = express.Router();

export const pdfRoutes = router.post(
  "/generatePDF",
  pdfMiddleware,
  generatePdfController
);
