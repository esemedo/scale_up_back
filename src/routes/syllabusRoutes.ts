import { Router } from "express";

import { getSyllabus } from "../controllers/SyllabusController";

const router = Router();

router.get("/", getSyllabus);

export default router;
