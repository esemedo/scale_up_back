import { Router } from "express";

import { getUserContracts, getUserCompany, getUserStructure } from "@/controllers/UserController";

const router = Router();

router.get("/:id/company", getUserCompany);
router.get("/:id/contracts", getUserContracts);
router.get("/:id/company", getUserStructure);


export default router;
