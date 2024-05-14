import { Router } from "express";

import { getAbsences } from "../controllers/AbsenceController";

const router = Router();

router.get('/', getAbsences);

export default router;