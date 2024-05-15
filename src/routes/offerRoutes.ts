import { Router } from "express";

import { getOfferId, getOfferStatus } from "../controllers/OfferController";

const router = Router();

router.get("/getOfferId", getOfferId);
router.get("/getOfferStatus", getOfferStatus);

export default router;
