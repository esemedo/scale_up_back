import { Router } from "express";

import { getOffers } from "../controllers/OfferController";

const router = Router();

router.get('/', getOffers);

export default router;