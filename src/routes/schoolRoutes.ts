import { Router } from "express";

import { getSchools } from "../controllers/SchoolController";

const router = Router();

router.get("/", getSchools);

export default router;
