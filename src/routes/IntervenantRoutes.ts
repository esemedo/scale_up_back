import { Router } from "express";
import {keycloak} from "index";
import authorizedUser from "../utils/accessByRole";
import { getCompany } from "../controllers/IntervenantController";

const router = Router();


router.get("/", keycloak.protect( authorizedUser ), getCompany);

export default router;
