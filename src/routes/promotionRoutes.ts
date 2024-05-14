import { Router } from 'express'

import { getPromotions } from '../controllers/PromotionController'
const router = Router()

router.get('/', getPromotions)

export default router
