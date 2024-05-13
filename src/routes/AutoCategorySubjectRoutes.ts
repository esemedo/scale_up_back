import express from "express";
import { addSubjectIfNotExists } from "../controllers/AutoCategorySubjectController";

const router = express.Router();

router.post("/subjects/add-if-not-exists", addSubjectIfNotExists);

export default router;
