import { Router } from "express";
import { body, param } from "express-validator";

import { getEndDate } from "controllers/ContractController";

const router = Router();

router.get("/getEndDate", getEndDate);

export default router;