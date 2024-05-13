import { sendRouteEmail } from '../controllers/EmailController';
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.post(
    "/",
    [
      body("receiver").notEmpty().withMessage(`Le receiver est invalide`),
      body("subject").notEmpty().withMessage("Le subject est obligatoire"),
      body("message").notEmpty().withMessage("Le message est obligatoire"),
    ],
    sendRouteEmail
  );

export default router;
