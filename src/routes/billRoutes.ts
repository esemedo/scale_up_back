// routes/billRoutes.ts
import { Router } from 'express';
import { getBills, validateBill, cancelBill } from '../controllers/BillController';

const router = Router();

router.get('/', getBills);
router.put('/:id/validate', validateBill);
router.put('/:id/cancel', cancelBill);

export default router;
