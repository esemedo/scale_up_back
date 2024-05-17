import { Router } from "express";
import {keycloak} from "index";

import { getCompany } from "../controllers/IntervenantController";

const router = Router();
function authorizedUser(token: any, request: any) {
    return token.hasRole( 'realm:buyer') || token.hasRole( 'realm:educational-assistant')|| token.hasRole( 'realm:management-controller')|| token.hasRole( 'realm:program-director')|| token.hasRole( 'realm:program-manager')
}

router.get("/", keycloak.protect( authorizedUser ), getCompany);

export default router;
