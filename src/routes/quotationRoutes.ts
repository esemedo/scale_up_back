import { Router } from "express";

import {
  selectQuotation,
  updateQuotationStatus,
  updateQuotation,
  deleteQuotation,
  selectAllQuotations,
  createQuotation,
} from "../controllers/QuotationController";

const router = Router();

router.post("/createQuotation", createQuotation);
router.get("/selectQuotation/:id", selectQuotation);
router.put("/updateQuotationStatus/:id", updateQuotationStatus);
router.put("/updateQuotation/:id", updateQuotation);
router.delete("/deleteQuotation/:id", deleteQuotation);
router.get("/selectAllQuotations", selectAllQuotations);

export default router;
