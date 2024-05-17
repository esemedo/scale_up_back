import { downloadBillHandler, uploadBillHandler } from "@/controllers/BillController";
import {
    downloadDocumentHandler,
  } from "@/controllers/documentController";
  import { createDocumentBodySchema } from "@/dto/documentDto";
  import { upload } from "@/libs/file";
  import { validateRequest } from "@/middlewares/validationMiddleware";
  import { Router } from "express";
  
  const router = Router();
  
  router.post(
    "/",
    upload.single("file"),

    uploadBillHandler
  );
  
  router.get("/:id", downloadBillHandler);
  
  export default router;
  