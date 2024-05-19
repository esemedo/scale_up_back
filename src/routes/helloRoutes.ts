import { Router } from "express";

import {
  uploadSyllabus,
  uploadSyllabusFile,
  getSubjects,
  getNeed,
  getOffers,
  uploadPTF,
  getPTF,
  getSyllabus,
  getTemplatePTF,
  getTemplateSyllabus,
  uploadBillFile,
  uploadBill,
  getBills,
  generatePDF,
  downloadPDF,
} from "../controllers/UploadController";

const router = Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/getSubjects", getSubjects);
router.get("/getOffers", getOffers);
router.get("/getNeed", getNeed);
router.get("/getPTF", getPTF);
router.get("/getSyllabus", getSyllabus);
router.get("/getTemplatePTF", getTemplatePTF);
router.get("/getTemplateSyllabus", getTemplateSyllabus);
router.get("/getBills", getBills);
router.get("/downloadTrainingReport", downloadPDF);

router.post("/generateTrainingReport", generatePDF);
router.post(
  "/uploadSyllabusFile",
  upload.single("syllabus"),
  uploadSyllabusFile
);
router.post("/uploadSyllabus", uploadSyllabus);
router.post("/uploadPTF", upload.single("ptf"), uploadPTF);
router.post("/uploadBillFile", upload.single("bill"), uploadBillFile);
router.post("/uploadBill", uploadBill);

export default router;
