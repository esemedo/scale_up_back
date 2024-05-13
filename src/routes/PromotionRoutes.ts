import { Router } from 'express'
import { prisma } from '../index'
import { getPromotionById, getPromotions } from '../controllers/PromotionController'

const router = Router()

router.get('/', getPromotions)
router.get('/promotions/:promotionsById', getPromotionById)
// router.post('/addSubjectToPromotion', addSubjectToPromotion)

router.get('/api/promotions', async (req, res) => {
  const promotions = await prisma.promotion.findMany();
  res.json(promotions);
});


export default router