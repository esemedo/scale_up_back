import {
  addContributor,
  getContributorExemptionsHandler,
  getContributorHandler,
  getContributorToSubjectExemptionsHandler,
  removeContributor,
} from "@/controllers/ContributorController";
import {
  readContributorExemptionsParamsSchema,
  readContributorParamsSchema,
} from "@/dto/contributorDto";
import { readExemptionsQuerySchema } from "@/dto/exemptionDto";
import { validateRequest } from "@/middlewares/validationMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", addContributor);
router.get(
  "/:id",
  validateRequest({ params: readContributorParamsSchema }),
  getContributorHandler
);

router.delete("/:id", removeContributor);

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

export default router;
