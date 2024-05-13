import { Router } from 'express'

import { getAllSubjects } from "../controllers/SubjectController";


const router = Router()

router.get('/', getAllSubjects)


export default router