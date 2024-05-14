import { Router } from 'express'

import { getPromotions,importPromotions } from '../controllers/PromotionController'
const router = Router()

router.get('/', getPromotions)
router.post('/upload', importPromotions)

export default router