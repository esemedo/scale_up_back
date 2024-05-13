import express from "express";
import { calculateTotalHoursForNeed } from "../controllers/AutoHourVolumeController";

const router = express.Router();

router.post("/needs/:needId/calculate-total-hours", calculateTotalHoursForNeed);

export default router;
