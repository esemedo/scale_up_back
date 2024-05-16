import { Router } from "express";

import { getBills } from "../controllers/BillController";

const router = Router();

router.get('/', getBills);

export default router;