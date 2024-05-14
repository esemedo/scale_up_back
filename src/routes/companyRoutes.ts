import { Router } from "express";

import { getCompanyContributors } from "@/controllers/CompanyController";

const router = Router();

router.get("/:id/contributors", getCompanyContributors);

export default router;
