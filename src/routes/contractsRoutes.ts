import { Router } from "express";

import { getAllContracts } from "../controllers/ContractController";

const router = Router();


router.get("/", getAllContracts);


export default router;
