import { Router } from 'express'
import { importData } from '../controllers/ImportDataController'

const router = Router()

router.post('/subjects', importData)
router.post('/promotions', importData)

export default router