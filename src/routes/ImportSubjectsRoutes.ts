import { Router } from 'express'
import { importSubject } from '../controllers/ImportSubjectController'

const router = Router()

router.post('/subjects', importSubject)

export default router