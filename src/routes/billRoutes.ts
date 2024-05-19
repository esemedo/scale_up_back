// routes/billRoutes.ts
import { Router } from 'express'
import { getBills, validateBill, cancelBill, downloadBill, viewBill } from '../controllers/BillController'

const router = Router()

router.get('/', getBills)
router.put('/:id/validate', validateBill)
router.put('/:id/cancel', cancelBill)
router.get('/:id/download', downloadBill)
router.get('/:id/view', viewBill)

export default router
