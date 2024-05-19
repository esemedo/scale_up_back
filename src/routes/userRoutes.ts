import { Router } from 'express'
import { body } from 'express-validator'
import { getUsers, registerUser, getAllAssistants } from '../controllers/UserController'
import { USER_ROLES } from '../utils/userConst'
import {keycloak} from "utils/keycloakClients";

const router = Router();

router.get("/", keycloak.protect(), getUsers);

router.post(
    '/',
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

router.get("/assistants", keycloak.protect(), getAllAssistants);

export default router;
