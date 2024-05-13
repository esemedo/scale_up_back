import { createAbsence, getAbsences } from '../controllers/AbsenceController'
import { Router } from 'express'


const router = Router()

router.get('/', getAbsences)
router.get('/create', createAbsence)

export default router
