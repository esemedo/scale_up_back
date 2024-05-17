import { Router } from "express";

import { getFilesPurchaseOrder, getPurchaseOrders } from "../controllers/PurchaseOrderController";

const router = Router();

router.get('/', getPurchaseOrders);
router.get("/files/:id", getFilesPurchaseOrder)
export default router;
