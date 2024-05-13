import { Router } from "express";

import { getCompanies } from "../controllers/CompanyController";

const router = Router();

router.get('/', getCompanies);

export default router;