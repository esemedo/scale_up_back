import { Router } from "express";

import {
  getCompany,
  getCompanyContributors,
} from "../controllers/CompanyController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { readCompanyParamsSchema } from "../dto/companyDto";

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

export default router;
