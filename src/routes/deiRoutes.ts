import { Router } from 'express'

import { getAllDEI, updateDei, updatePriority, updateStatusDEI, updateStatusSacha } from '../controllers/DeiController'
import { validBody, validFormData, validId, validQuery } from '../middlewares/handleValidDei'
import { handleValidationErrors } from '../middlewares/handleValidator'
import upload from '../middlewares/multer'

const router = Router()

router.get('/',validQuery("priority"), validQuery("status"), handleValidationErrors,getAllDEI)
router.patch('/:id/status', validBody('id', "status"), handleValidationErrors, updateStatusDEI)
router.patch('/:id/update', validFormData(), handleValidationErrors, upload.single("file"), updateDei)
// router.patch('/:id/sachaStatus', validBody('id', "sachaStatus"),handleValidationErrors, updateStatusSacha)
// router.patch('/:id/priority', validBody('id', "priority") ,handleValidationErrors,updatePriority)

export default router
