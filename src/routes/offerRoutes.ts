import { Router } from "express";

import { getOfferId, getOfferStatus } from "../controllers/OfferController";

const router = Router();

router.get("/getAuthorIdByOffer/:id", getOfferId);
router.get("/getOfferStatus/:id", getOfferStatus);

export default router;
