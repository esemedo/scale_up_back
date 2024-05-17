import Router from "express";
import { generatePdfController } from "../controllers/PdfController";
import { pdfMiddleware } from "../middlewares/pdfMiddleware";

const router = Router();

const pdfRoutes = router.post(
  "/generatePDF",
  pdfMiddleware,
  generatePdfController
);

export default pdfRoutes;