import express from "express";
import { updateNeedToDraft, cancelDraftNeed } from "../controllers/UpdateDeleteNeedDraftController";

const router = express.Router();

router.put("/needs/:id/draft", updateNeedToDraft);

router.delete("/needs/:id/draft", cancelDraftNeed);

export default router;
