import { Router } from "express";

import {
  getCompany,
  getCompanyContributors,
} from "../controllers/CompanyController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { readCompanyParamsSchema } from "../dto/companyDto";

import { getCompanies } from "../controllers/CompanyController";

const router = Router();

router.get(
  "/:id",
  validateRequest({
    params: readCompanyParamsSchema,
  }),
  getCompany
);
router.get(
  "/:id/contributors",
  validateRequest({
    params: readCompanyParamsSchema,
  }),
  getCompanyContributors
);

router.get("/", getCompanies);

router.get("/:id", getCompany);

export default router;
