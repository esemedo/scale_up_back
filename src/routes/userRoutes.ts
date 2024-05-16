import { Router } from "express";

import { getUsers , getAllAssistants} from "../controllers/UserController";

const router = Router();

router.get('/', getUsers);
router.get('/assistants', getAllAssistants);


export default router;