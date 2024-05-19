import { Router } from 'express'
import { getAllDEI, updateDei, updateStatusDEI } from '../controllers/DeiController'
import { validBody, validFormData, validId, validQuery, validStatus } from '../middlewares/handleValidDei'
import { handleValidationErrors } from '../middlewares/handleValidator'
import upload from '../middlewares/multer'

const router = Router();

router.get('/',validQuery("priority"), validQuery("status"), handleValidationErrors,getAllDEI)
router.patch('/:id/status', validStatus(), handleValidationErrors, updateStatusDEI)
router.patch('/:id/update', validFormData(), handleValidationErrors, upload.single("file"), updateDei)

export default router;
