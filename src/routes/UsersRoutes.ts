import { getAllAssistants, getControllerGestion } from '../controllers/UsersController'
import { Router } from 'express'


const router = Router()

router.get('/assistants', getAllAssistants)


export default router