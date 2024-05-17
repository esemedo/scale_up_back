import { Router } from "express";
import { body, param } from "express-validator";

import {
  selectQuotation,
  updateQuotationStatus,
  updateQuotation,
  deleteQuotation,
  selectAllQuotations,
  createQuotation,
} from "../controllers/QuotationController";
import { handleValidationErrors } from "../middlewares/handleValidator";

const router = Router();

const validateQuotationId = [
  param("id").isInt().withMessage(`L'id de la quotation est invalide`)
];

const validateQuotationData = [
  body("customerName")
    .isLength({ min: 1 }).withMessage("Le nom du client est requis")
    .bail()
    .trim()
    .escape(),
  body("amount")
    .isFloat({ min: 0 }).withMessage("Le montant doit être un nombre positif")
    .bail()
    .trim()
    .escape(),
  body("status")
    .isIn(['pending', 'approved', 'rejected']).withMessage("Le statut doit être 'pending', 'approved' ou 'rejected'")
    .bail()
    .trim()
    .escape(),
];

router.post(
  "/createQuotation",
  validateQuotationData,
  handleValidationErrors,
  createQuotation
);

router.get(
  "/selectQuotation/:id",
  validateQuotationId,
  handleValidationErrors,
  selectQuotation
);

router.put(
  "/updateQuotationStatus/:id",
  validateQuotationId,
  body("status")
    .isIn(['pending', 'approved', 'rejected']).withMessage("Le statut doit être 'pending', 'approved' ou 'rejected'")
    .bail()
    .trim()
    .escape(),
  handleValidationErrors,
  updateQuotationStatus
);

router.put(
  "/updateQuotation/:id",
  validateQuotationId,
  validateQuotationData,
  handleValidationErrors,
  updateQuotation
);

router.delete(
  "/deleteQuotation/:id",
  validateQuotationId,
  handleValidationErrors,
  deleteQuotation
);

router.get("/selectAllQuotations", selectAllQuotations);

export default router;
