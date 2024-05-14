import { Router } from "express";

import {
  getCompany,
  getCompanyContributors,
} from "@/controllers/CompanyController";

const router = Router();

router.get("/:id", getCompany);
router.get("/:id/contributors", getCompanyContributors);

export default router;
