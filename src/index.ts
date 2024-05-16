import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import categoryRoutes from "./routes/CategoryRoutes";
import helloRoutes from "./routes/helloRoutes";
import subjectRoutes from "./routes/SubjectRoutes";
import dei from './routes/deiRoutes'
import absence from './routes/AbsenceRoutes'
import users from './routes/UsersRoutes'
dotenv.config();
import KcAdminClient from '@keycloak/keycloak-admin-client'
import { PrismaClient } from "@prisma/client";
import Keycloak from "keycloak-connect";
import morgan from "morgan";
import { createUserIfNotExistsMiddleware } from "./middlewares/createUserIfNotExistsMiddleware";
import { Credentials } from "@keycloak/keycloak-admin-client/lib/utils/auth";
import notifRoutes from './routes/notifRoutes'
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
export const kcAdminClient = new KcAdminClient({
  baseUrl: process.env.KC_URL,
  realmName: process.env.KC_REALM
})

const kcAdminClientCredentials = {
  username: process.env.KC_CLIENT_ID,
  clientSecret: process.env.KC_CLIENT_SECRET,
  grantType: 'client_credentials',
  clientId: process.env.KC_CLIENT_ID
} as Credentials
await kcAdminClient.auth(kcAdminClientCredentials)

setInterval(() => kcAdminClient.auth(kcAdminClientCredentials), 58 * 1000)
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
app.use('/api/dei',keycloak.protect(), dei)
app.use('/api/absence',keycloak.protect(), absence)
app.use('/api/users',keycloak.protect(), users)
app.use ('/api/notifications', notifRoutes)
export { app };
