import { Router } from "express";
import { param } from "express-validator";

import { getEndDate } from "../controllers/ContractController";
import { handleValidationErrors } from "../middlewares/handleValidator";

const router = Router();

const validateContractId = [
  param("id").isInt().withMessage(`L'id du contrat est invalide`)
];

router.get(
  "/getEndDate/:id",
  validateContractId,
  handleValidationErrors,
  getEndDate
);

export default router;
