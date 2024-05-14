import { Router } from "express";

import {
  createExemptionBodySchema,
  readContributorExemptionsParamsSchema,
  readContributorToSubjectExemptionsParamsSchema,
  readExemptionsQuerySchema,
  updateExemptionParamsSchema,
  updateExemptionQuerySchema,
} from "@/dto/exemptionDto";

import {
  processExemptionRequestHandler,
  createExemptionRequestHandler,
  getExemptionsHandler,
  getContributorExemptionsHandler,
  getContributorToSubjectExemptionsHandler,
} from "@/controllers/ExemptionController";
import { validateRequest } from "@/middlewares/validationMiddleware";

const router = Router();

router.post(
  "/",
  validateRequest({
    body: createExemptionBodySchema,
  }),
  createExemptionRequestHandler
);

router.get(
  "/",
  validateRequest({
    query: readExemptionsQuerySchema,
  }),
  getExemptionsHandler
);

router.get(
  "/contributor/:contributorId",
  validateRequest({
    params: readContributorExemptionsParamsSchema,
    query: readExemptionsQuerySchema,
  }),
  getContributorExemptionsHandler
);

router.get(
  "/contributor/:contributorId/subject/:subjectId",
  validateRequest({
    params: readContributorToSubjectExemptionsParamsSchema,
    query: readExemptionsQuerySchema,
  }),
  getContributorToSubjectExemptionsHandler
);

router.put(
  "/:id",
  validateRequest({
    params: updateExemptionParamsSchema,
    query: updateExemptionQuerySchema,
  }),
  processExemptionRequestHandler
);

export default router;
