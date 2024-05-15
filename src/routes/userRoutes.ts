import { Router } from "express";

import { getUserContracts, getUserCompany, getUserNotifications } from "@/controllers/UserController";

const router = Router();

router.get("/:id/company", getUserCompany);
router.get("/:id/notifications", getUserNotifications);
router.get("/:id/contracts", getUserContracts);

export default router;
