import { Router } from "express";

import { getCompany, getHello } from "../controllers/HelloController";

const router = Router();

router.get("/", getHello);
router.get("/users", getCompany)

export default router;
