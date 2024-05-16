import {
  downloadDocumentHandler,
  uploadDocumentHandler,
} from "@/controllers/documentController";
import { createDocumentBodySchema } from "@/dto/documentDto";
import { upload } from "@/libs/file";
import { validateRequest } from "@/middlewares/validationMiddleware";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  upload.single("file"),
  validateRequest({
    body: createDocumentBodySchema,
  }),
  uploadDocumentHandler
);

router.get("/:id", downloadDocumentHandler);

export default router;
