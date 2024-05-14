import { createAbsence, getAbsences, updateSubstituteAbsence } from '../controllers/AbsenceController'
import { Router } from 'express'


const router = Router()

router.get('/', getAbsences)
router.post('/create', createAbsence)
router.patch('/:id/substitute', updateSubstituteAbsence)

export default router
