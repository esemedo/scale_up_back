import {
  downloadBillHandler,
  uploadBillHandler,
} from "../controllers/BillController";
import { downloadDocumentHandler } from "../controllers/documentController";
import { createDocumentBodySchema } from "../dto/documentDto";
import { upload } from "../libs/file";
import { validateRequest } from "../middlewares/validationMiddleware";
import { Router } from "express";

import { getBills } from "../controllers/BillController";

const router = Router();

router.get("/", getBills);

router.post(
  "/",
  upload.single("file"),

  uploadBillHandler
);

router.get("/:id", downloadBillHandler);

export default router;
