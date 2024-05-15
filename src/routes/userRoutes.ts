import { Router } from "express";

import { getUserContracts, getUserCompany } from "@/controllers/UserController";

const router = Router();

router.get("/:id/company", getUserCompany);
router.get("/:id/contracts", getUserContracts);

export default router;
