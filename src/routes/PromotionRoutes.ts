import { Router } from 'express'
import { getPromotions, getPromotionById } from '../controllers/PromotionController'

const router = Router()

router.get('/', getPromotions)
router.get('/:promotionId', getPromotionById)

export default router