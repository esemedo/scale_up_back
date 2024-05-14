import { Router } from "express";

import { getQuotations } from "../controllers/QuotationController";

const router = Router();

router.get('/', getQuotations);

export default router;