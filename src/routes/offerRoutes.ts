import { Router } from "express";
import { param } from "express-validator";

import { getOfferId, getOfferStatus } from "../controllers/OfferController";
import { handleValidationErrors } from "../middlewares/handleValidator";

const router = Router();

const validateOfferId = [
  param("id").isInt().withMessage(`L'id de l'offre est invalide`)
];

router.get(
  "/getAuthorIdByOffer/:id",
  validateOfferId,
  handleValidationErrors,
  getOfferId
);

router.get(
  "/getOfferStatus/:id",
  validateOfferId,
  handleValidationErrors,
  getOfferStatus
);

export default router;
