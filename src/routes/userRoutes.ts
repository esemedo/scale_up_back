import { Router } from "express";

import { getUserCompany } from "@/controllers/UserController";

const router = Router();

router.get("/:id/company", getUserCompany);

export default router;
