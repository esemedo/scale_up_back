import { Router } from "express";

import { getCompanies, getCompany } from "../controllers/CompanyController";

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompany);

export default router;