import { Router } from "express";

import { getDeis } from "../controllers/DeiController";

const router = Router();

router.get("/", getDeis);

export default router;
