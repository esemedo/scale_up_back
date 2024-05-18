import { Router } from "express";

import {
  getUserContractsHandler,
  getUserCompanyHandler,
  getUserNotifications,
  getUserDocumentsHandler,
  getUsers,
} from "../controllers/UserController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { readUserParamsSchema } from "../dto/userDto";
import { readDocumentsQuerySchema } from "../dto/documentDto";

const router = Router();

router.get(
  "/:id/company",
  validateRequest({ params: readUserParamsSchema }),
  getUserCompanyHandler
);
router.get(
  "/:id/contracts",
  validateRequest({ params: readUserParamsSchema }),
  getUserContractsHandler
);
router.get(
  "/:id/documents",
  validateRequest({
    params: readUserParamsSchema,
    query: readDocumentsQuerySchema,
  }),
  getUserDocumentsHandler
);

router.get("/", getUsers);

export default router;
