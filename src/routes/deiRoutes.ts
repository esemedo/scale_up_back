import { Router } from 'express'

import { getAllDEI, updatePriority, updateStatusDEI, updateStatusSacha } from '../controllers/DeiController'
import { validBody, validId, validQuery } from '../middlewares/handleValidDei'
import { handleValidationErrors } from '../middlewares/handleValidator'

const router = Router()

router.get('/',validQuery("priority"), getAllDEI)
router.patch('/:id/status', validBody('id', "status"), handleValidationErrors, updateStatusDEI)
router.patch('/:id/sachaStatus', validBody('id', "sachaStatus"),handleValidationErrors, updateStatusSacha)
router.patch('/:id/priority', validBody('id', "priority") ,handleValidationErrors,updatePriority)

export default router
