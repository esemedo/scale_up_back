import { Router } from 'express'

import { getHello } from '../controllers/HelloController'
import { uploadSyllabus, uploadSyllabusFile, getSubjects, getNeed, getOffers, uploadPTF, getPTF, getSyllabus, getTemplatePTF, getTemplateSyllabus, uploadBillFile, uploadBill, getBills } from '../controllers/UploadController'

const router = Router();

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', getHello);

router.get('/getSubjects', getSubjects);
router.get('/getOffers', getOffers);
router.get('/getNeed', getNeed);
router.get('/getPTF', getPTF);
router.get('/getSyllabus', getSyllabus);
router.get('/getTemplatePTF', getTemplatePTF);
router.get('/getTemplateSyllabus', getTemplateSyllabus);
router.get('/getBills', getBills);

router.post('/uploadSyllabusFile', upload.single('syllabus'), uploadSyllabusFile);
router.post('/uploadSyllabus', uploadSyllabus);
router.post('/uploadPTF', upload.single('ptf'), uploadPTF);
router.post('/uploadBillFile',upload.single('bill'),  uploadBillFile)
router.post('/uploadBill', uploadBill)

export default router
