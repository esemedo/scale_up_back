import { Router } from 'express'
import { getSubjects, getSubjectsByCategory } from '../controllers/SubjectController' // add en cas ou : addSubjectToPromotion
import { prisma } from '../index'

const router = Router()

router.get('/', getSubjects)
router.get('/:subjectByID', getSubjectsByCategory)

router.get('/api/subjects', async (req, res) => {
  const subjects = await prisma.subject.findMany();
  res.json(subjects);
});

export default router