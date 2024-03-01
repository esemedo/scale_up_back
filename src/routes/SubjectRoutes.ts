import { Router } from 'express'
import { getSubjects, getSubjectsByCategory } from '../controllers/SubjectController'

const router = Router()

router.get('/', getSubjects)
router.get('/subject/:categoryId', getSubjectsByCategory)

export default router
