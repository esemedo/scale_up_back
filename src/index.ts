import dotenv from "dotenv";
dotenv.config();
import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import companyRoutes from "./routes/companyRoutes";
import contributorRoutes from "./routes/contributorRoutes";
import exemptionRoutes from "./routes/exemptionRoutes";
import helloRoutes from "./routes/helloRoutes";
import userRoutes from "./routes/userRoutes";
import Keycloak, { KeycloakConfig } from "keycloak-connect";
import { PrismaClient } from "@prisma/client";
import { createUserIfNotExistsMiddleware } from "./middlewares/createUserIfNotExistsMiddleware";
import errorHandler from "./middlewares/errorHandlerMiddleware";

// const kcConfig: KeycloakConfig = {
//   clientId: process.env.KC_CLIENT_ID,
//   bearerOnly: true,
//   serverUrl: process.env.KC_URL,
//   "ssl-required": "external",
//   secret: process.env.KC_SECRET,
//   realm: process.env.KC_REALM!,
//   "auth-server-url": process.env.KC_URL!,
//   "confidential-port": 0,
//   resource: process.env.KC_CLIENT_ID!,
// };

// export const keycloak = new Keycloak({}, kcConfig);

export const prisma = new PrismaClient();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// app.use(keycloak.middleware());
// app.use(createUserIfNotExistsMiddleware);

// Routes
const router = Router();

router.use("/", helloRoutes);
router.use("/users", userRoutes);
router.use("/companies", companyRoutes);
router.use("/contributors", contributorRoutes);
router.use("/exemptions", exemptionRoutes);

app.use("/api", router);

// Error handler
app.use(errorHandler());

export { app };
