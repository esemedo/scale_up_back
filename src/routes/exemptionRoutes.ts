import { Router } from "express";

import {
  createExemptionBodySchema,
  readExemptionsQuerySchema,
  updateExemptionParamsSchema,
  updateExemptionQuerySchema,
} from "@/dto/exemptionDto";

import {
  processExemptionRequestHandler,
  createExemptionRequestHandler,
  getExemptionsHandler,
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

router.put(
  "/:id",
  validateRequest({
    params: updateExemptionParamsSchema,
    query: updateExemptionQuerySchema,
  }),
  processExemptionRequestHandler
);

export default router;
