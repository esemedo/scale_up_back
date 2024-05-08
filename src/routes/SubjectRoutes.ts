import { Router } from 'express'
import { getPromotions, getPromotionById } from '../controllers/PromotionController'
import { prisma } from '../index'

const router = Router()

router.get('/', getPromotions)
router.get('/:promotionId', getPromotionById)

router.get('/api/promotions', async (req, res) => {
  const promotions = await prisma.promotion.findMany();
  res.json(promotions);
});

export default router