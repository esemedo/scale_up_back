import { Router } from "express";

import { getContributors } from "../controllers/ContributorController";

const router = Router();

router.get("/", getContributors);

export default router;
