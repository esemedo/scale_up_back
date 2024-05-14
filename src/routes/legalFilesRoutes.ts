import { Router } from "express";

import { getLegalFiles } from "../controllers/LegalFileController";

const router = Router();

router.get('/', getLegalFiles);

export default router;