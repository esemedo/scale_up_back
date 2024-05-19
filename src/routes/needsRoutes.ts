import { Router } from 'express'
import { getNeeds, getNeedsByYear, createNeed, updateNeedToDraft, cancelDraftNeed, updateNeedToPublished } from '../controllers/NeedController'

const router = Router()

router.get('/', getNeeds)
router.get('/:year', getNeedsByYear)
router.post('/', createNeed)
router.put('/:id/draft', updateNeedToDraft) 
router.put('/:id/cancel', cancelDraftNeed)
router.put('/:id/publish', updateNeedToPublished)

export default router