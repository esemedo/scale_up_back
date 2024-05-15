import { addNotif } from "../controllers/NotifController";
import { Router } from "express";

const router = Router();

router.post("/", addNotif);
export default router;