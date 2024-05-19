import { Router } from "express";

import { getContracts } from "../controllers/ContractController";

const router = Router();

router.get("/", getContracts);

export default router;
