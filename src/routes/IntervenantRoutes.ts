import { Router } from "express";
import { getCompany } from "../controllers/IntervenantController";
import authorizedUser from "../utils/accessByRole";

const router = Router();

const IntervenantRoutes = (keycloak) => {
  router.get("/", keycloak.protect(authorizedUser), getCompany);
  return router;
};

export default IntervenantRoutes;
