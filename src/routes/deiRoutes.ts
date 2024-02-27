import { Router } from 'express'

import { getAllDEI } from '../controllers/DeiController'

const router = Router()

router.get('/', getAllDEI)

export default router
