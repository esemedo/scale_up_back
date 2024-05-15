import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import categoryRoutes from "./routes/CategoryRoutes";
import helloRoutes from "./routes/helloRoutes";
import subjectRoutes from "./routes/SubjectRoutes";
import hourlyRateRoutes from "./routes/hourlyRateRoutes";
import quotationRoute from "./routes/quotationRoutes";
import offerRoutes from "./routes/offerRoutes";
import contractroutes from "./routes/contractRoutes";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import Keycloak from "keycloak-connect";
import morgan from "morgan";
import { createUserIfNotExistsMiddleware } from "./middlewares/createUserIfNotExistsMiddleware";

const kcConfig = {
  clientId: process.env.KC_CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.KC_URL,
  "ssl-required": "external",
  secret: process.env.KC_SECRET,
  realm: process.env.KC_REALM,
  "auth-server-url": process.env.KC_URL,
  "confidential-port": 0,
  resource: process.env.KC_CLIENT_ID,
};

export const keycloak = new Keycloak({}, kcConfig);

export const prisma = new PrismaClient();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(keycloak.middleware());
app.use(createUserIfNotExistsMiddleware);

app.use("/api", helloRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/category", categoryRoutes);
app.use('/hourlyRateRoutes', hourlyRateRoutes)
app.use('/quotation', quotationRoute)
app.use('/offer', offerRoutes)
app.use('/contract', contractroutes)

export { app };
