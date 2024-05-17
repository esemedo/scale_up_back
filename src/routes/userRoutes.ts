import { Router } from 'express'
import { body } from 'express-validator'
import { registerUser } from '../controllers/UserController'
import { USER_ROLES } from '../utils/userConst'

import { getUsers, getAllAssistants } from "../controllers/UserController";

const router = Router();

router.post(
    '/register',
    [
        body('firstName').isString().isLength({ min: 2, max: 50 }),
        body('lastName').isString().isLength({ min: 2, max: 50 }),
        body('email').isEmail(),
        body('password').isString().isLength({ min: 8 }),
        body('phone').isMobilePhone('any', { strictMode: false }),
        body('role').isIn(USER_ROLES)
    ],
    registerUser
)

router.get("/", getUsers);
router.get("/assistants", getAllAssistants);

export default router;
