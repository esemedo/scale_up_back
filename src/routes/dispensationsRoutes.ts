import { Router } from "express";

import { getDispensations } from "../controllers/DispensationController";

const router = Router();

router.get('/', getDispensations);

export default router;