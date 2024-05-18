import { Router } from "express";

import { exportSheet } from "../controllers/exportSheetController";

const router = Router();

router.post("/export", exportSheet);

export default router;