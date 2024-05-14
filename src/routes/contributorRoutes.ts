import {
  addContributor,
  getContributorExemptionsHandler,
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
