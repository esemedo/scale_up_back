import { Router } from 'express'

import { getNeeds, getNeedsByYear, createNeed } from '../controllers/NeedController'

const router = Router()

router.get('/', getNeeds)
router.get('/:year', getNeedsByYear)
router.post('/', createNeed)

export default router
