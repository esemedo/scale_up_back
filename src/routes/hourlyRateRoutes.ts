import { Router } from "express";
import { body, param } from "express-validator";

import {
  addHourlyRate,
  getAllHourlyRates,
  getHourlyRateById,
  updateHourlyRate,
  getAllSubjectsNames,
  updateHourlyRateRealRate,
  deleteHourlyRate,
} from "../controllers/HourlyRatesController";
import { handleValidationErrors } from "../middlewares/handleValidator";

const router = Router();

const validateHourlyRateId = [
  param("id").isInt().withMessage(`L'id du taux horaire est invalide`)
];

const validateHourlyRate = [
  body("rate")
    .isFloat({ min: 0 })
    .withMessage("Le taux horaire doit être un nombre positif")
    .bail()
    .trim()
    .escape()
];

const validateRealRate = [
  body("realRate")
    .isFloat({ min: 0 })
    .withMessage("Le taux réel doit être un nombre positif")
    .bail()
    .trim()
    .escape()
];

router.post(
  "/addHourlyRate",
  validateHourlyRate,
  handleValidationErrors,
  addHourlyRate
);

router.get("/getAllHourlyRates", getAllHourlyRates);

router.get(
  "/getHourlyRateById/:id",
  validateHourlyRateId,
  handleValidationErrors,
  getHourlyRateById
);

router.put(
  "/updateHourlyRate/:id",
  validateHourlyRateId,
  validateHourlyRate,
  handleValidationErrors,
  updateHourlyRate
);

router.get("/getAllSubjectsNames", getAllSubjectsNames);

router.put(
  "/updateHourlyRateRealRate/:id",
  validateHourlyRateId,
  validateRealRate,
  handleValidationErrors,
  updateHourlyRateRealRate
);

router.delete(
  "/deleteHourlyRate/:id",
  validateHourlyRateId,
  handleValidationErrors,
  deleteHourlyRate
);

export default router;
