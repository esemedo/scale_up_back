import { Router } from 'express'

import { getAllDEI, updateStatusDEI } from '../controllers/DeiController'

const router = Router()

router.get('/', getAllDEI)
router.patch('/', updateStatusDEI)

export default router
