import {
  downloadBillHandler,
  getBills,
  uploadBillHandler,
} from "../controllers/BillController";
import { downloadDocumentHandler } from "../controllers/documentController";
import { createDocumentBodySchema } from "../dto/documentDto";
import { upload } from "../libs/file";
import { validateRequest } from "../middlewares/validationMiddleware";
import { Router } from "express";
import {
  validateBill,
  cancelBill,
  downloadBill,
  viewBill,
} from "../controllers/BillController";

const router = Router();

router.get("/", getBills);

router.post(
  "/",
  upload.single("file"),

  uploadBillHandler
);

router.get("/:id", downloadBillHandler);

router.put("/:id/validate", validateBill);
router.put("/:id/cancel", cancelBill);
router.get("/:id/download", downloadBill);
router.get("/:id/view", viewBill);
router.get("/", getBills);

export default router;
