import { Router } from "express";
<<<<<<< HEAD
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
=======

import { getContracts } from "../controllers/ContractController";

const router = Router();

router.get('/', getContracts);

export default router;
>>>>>>> 4f3ef9ec787fb53b48753a3902a32987c384097a
