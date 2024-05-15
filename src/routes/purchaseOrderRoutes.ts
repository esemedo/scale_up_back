import { Router } from "express";

import { getPurchaseOrders } from "../controllers/PurchaseOrderController";

const router = Router();

router.get('/', getPurchaseOrders);

export default router;