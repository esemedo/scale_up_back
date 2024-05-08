import { Router } from 'express'

import { getAllDEI, updatePriority, updateStatusDEI, updateStatusSacha } from '../controllers/DeiController'

const router = Router()

router.get('/', getAllDEI)
router.patch('/:id/status', updateStatusDEI)
router.patch('/:id/sachaStatus', updateStatusSacha)
router.patch('/:id/priority', updatePriority)

export default router
