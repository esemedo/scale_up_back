import { Router } from "express";

import { getHourlyRates } from "../controllers/HourlyRateController";

const router = Router();

router.get("/", getHourlyRates);

export default router;
