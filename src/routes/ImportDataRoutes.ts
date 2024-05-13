import { Router } from 'express'
import upload from '../middlewares/uploadData'
import { importData } from '../controllers/ImportDataController'

const router = Router()

router.post('/subjects', upload.single('file'), importData)
router.post('/promotions', upload.single('file'), importData)

export default router