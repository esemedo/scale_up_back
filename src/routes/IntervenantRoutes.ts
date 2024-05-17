import { Router } from "express";

import { getCompany } from "../controllers/IntervenantController";

const router = Router();

router.get("/", getCompany);

export default router;
