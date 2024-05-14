import { Router } from 'express'
import { importPromotions } from '../controllers/ImportPromotionController'

const router = Router()

router.post('/promotions', importPromotions)

export default router