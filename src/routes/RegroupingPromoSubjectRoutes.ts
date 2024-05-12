import express from "express";
import { regroupPromotionsForCategory } from "../controllers/RegroupingPromoSubjectController";

const router = express.Router();

router.post("/categories/:categoryId/regroup-promotions", regroupPromotionsForCategory);

export default router;
