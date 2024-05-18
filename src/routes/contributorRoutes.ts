import {
  addContributor,
  getContributorDocumentsHandler,
  getContributorExemptionsHandler,
  getContributorHandler,
  getContributorToSubjectExemptionsHandler,
  removeContributor,
} from "../controllers/ContributorController";
import {
  createContributorBodySchema,
  readContributorExemptionsParamsSchema,
  readContributorParamsSchema,
} from "../dto/contributorDto";
import { readDocumentsQuerySchema } from "../dto/documentDto";
import { readExemptionsQuerySchema } from "../dto/exemptionDto";
import { validateRequest } from "../middlewares/validationMiddleware";
import { Router } from "express";

import { getContributors } from "../controllers/ContributorController";

const router = Router();

router.post(
  "/",
  validateRequest({
    body: createContributorBodySchema,
  }),
  addContributor
);
router.get(
  "/:id",
  validateRequest({ params: readContributorParamsSchema }),
  getContributorHandler
);

router.delete(
  "/:id",
  validateRequest({ params: readContributorParamsSchema }),
  removeContributor
);

router.get(
  "/:id/exemptions",
  validateRequest({
    params: readContributorParamsSchema,
    query: readExemptionsQuerySchema,
  }),
  getContributorExemptionsHandler
);
router.get(
  "/:id/exemptions/subject/:subjectId",
  validateRequest({
    params: readContributorExemptionsParamsSchema,
    query: readExemptionsQuerySchema,
  }),
  getContributorToSubjectExemptionsHandler
);

router.get(
  "/:id/documents",
  validateRequest({
    params: readContributorParamsSchema,
    query: readDocumentsQuerySchema,
  }),
  getContributorDocumentsHandler
);

router.get("/", getContributors);

export default router;
