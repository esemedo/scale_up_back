import { validCreateAbsence, validateNumericIdParam, validUpdateAbsence } from 'middlewares/handleValidAbsence'
import { createAbsence, deleteAbsence, getAbsences, updateSubstituteAbsence } from '../controllers/AbsenceController'
import { Router } from 'express'
import { handleValidationErrors } from 'middlewares/handleValidator'


const router = Router()

router.get('/', getAbsences)
router.post('/create', validCreateAbsence(), handleValidationErrors, createAbsence)
router.patch('/:id/substitute',validUpdateAbsence(), handleValidationErrors, updateSubstituteAbsence)
router.delete('/:id/delete',validateNumericIdParam('id'),handleValidationErrors, deleteAbsence)

export default router
