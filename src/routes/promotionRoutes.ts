import { Router } from "express";
import { body, param } from "express-validator";
import {
  addAssistantToPromotion,
  getAssistantsForPromotion,
  getPromotions,
  importPromotions,
} from "../controllers/PromotionController";
import { handleValidationErrors } from "../middlewares/handleValidator";
const router = Router();

router.get("/", getPromotions);
router.post("/upload", importPromotions);

const validateAddAssistant = [
  param("promotionId")
    .notEmpty()
    .withMessage("L'identifiant de la promotion est obligatoire"),
  param("promotionId")
    .isInt()
    .withMessage("L'identifiant de la promotion doit être un nombre entier"),
  body("assistantId")
    .notEmpty()
    .withMessage("L'identifiant de l'assistant est obligatoire"),
  body("assistantId")
    .isInt()
    .withMessage("L'identifiant de l'assistant doit être un nombre entier"),
];

router.get("/promotions-with-assistants", getAssistantsForPromotion);

router.post(
  "/:promotionId/assistants",
  validateAddAssistant,
  handleValidationErrors,
  addAssistantToPromotion
);

export default router;
