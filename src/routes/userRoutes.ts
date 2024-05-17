import { Router } from "express";

import { getUsers } from "../controllers/UserController";
import { getAllAssistants } from "../controllers/UserController";

const router = Router();

router.get('/', getUsers);
router.get('/assistants', getAllAssistants)

export default router;