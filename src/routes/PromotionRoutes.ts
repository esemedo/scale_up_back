import { Router } from 'express'
import { getSubjects, getSubjectsByCategory, addSubjectToPromotion } from '../controllers/SubjectController'
import { prisma } from '../index'

const router = Router()

router.get('/', getSubjects)
router.get('/subject/:categoryId', getSubjectsByCategory)
router.post('/addSubjectToPromotion', addSubjectToPromotion)

router.get('/api/subjects', async (req, res) => {
  const subjects = await prisma.subject.findMany();
  res.json(subjects);
});

export default router