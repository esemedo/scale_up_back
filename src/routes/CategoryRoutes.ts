import { Router } from 'express'
import { getCategories } from '../controllers/CategoryController'

const router = Router()

router.get('/', getCategories)

export default router