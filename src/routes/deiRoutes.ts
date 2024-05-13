import { Router } from 'express'

import { getAllDEI, updatePriority, updateStatusDEI, updateStatusSacha } from '../controllers/DeiController'
import { validId } from '../middlewares/handleValidDei'
import { handleValidationErrors } from '../middlewares/handleValidator'

const router = Router()

router.get('/', getAllDEI)
router.patch('/:id/status', validId('id'), handleValidationErrors, updateStatusDEI)
router.patch('/:id/sachaStatus', updateStatusSacha)
router.patch('/:id/priority', updatePriority)

export default router
