dotenv.config();

import KcAdminClient from "@keycloak/keycloak-admin-client";
import { Credentials } from "@keycloak/keycloak-admin-client/lib/utils/auth";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import Keycloak from "keycloak-connect";
import morgan from "morgan";
import { createUserIfNotExistsMiddleware } from "./middlewares/createUserIfNotExistsMiddleware";
import absenceRoutes from "./routes/absenceRoutes";
import billRoutes from "./routes/billRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import companyRoutes from "./routes/companyRoutes";
import contributorRoutes from "./routes/contributorRoutes";
import deiRoutes from "./routes/deiRoutes";
import dispensationsRoutes from "./routes/dispensationsRoutes";
import hourlyRatesRoutes from "./routes/hourlyRatesRoutes";
import IntervenantRoutes from "./routes/IntervenantRoutes";
import legalFilesRoutes from "./routes/legalFilesRoutes";
import needsRoutes from "./routes/needsRoutes";
import notificationSettingsRoutes from "./routes/notificationSettingsRoutes";
import notifRoutes from "./routes/notifRoutes";
import offersRoutes from "./routes/offersRoutes";
import { pdfRoutes } from "./routes/pdfRoutes";
import promotionRoutes from "./routes/promotionRoutes";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes";
import quotationRoutes from "./routes/quotationRoutes";
import schoolRoutes from "./routes/schoolRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import syllabusRoutes from "./routes/syllabusRoutes";
import userRoutes from "./routes/userRoutes";

export const prisma = new PrismaClient();

const app = express();


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

export const kcAdminClient = new KcAdminClient({
  baseUrl: process.env.KC_URL,
  realmName: process.env.KC_REALM,
});

const kcAdminClientCredentials = {
    username: process.env.KC_CLIENT_ID,
    clientSecret: process.env.KC_CLIENT_SECRET,
    grantType: "client_credentials",
    clientId: process.env.KC_CLIENT_ID,
} as Credentials;

await kcAdminClient.auth(kcAdminClientCredentials);

setInterval(() => kcAdminClient.auth(kcAdminClientCredentials), 58 * 1000);

export const keycloak = new Keycloak({}, kcConfig);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(keycloak.middleware());
app.use(createUserIfNotExistsMiddleware);

app.use("/api/needs", needsRoutes);
app.use("/api/promotions", keycloak.protect(), promotionRoutes);
app.use("/api/company", IntervenantRoutes(keycloak));
app.use("/api/subjects", subjectRoutes);

app.use("/api/contributors", contributorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", keycloak.protect(), userRoutes);
app.use("/api/dei", deiRoutes);
app.use("/api/notification-settings", notificationSettingsRoutes);
app.use("/api/dispensations", dispensationsRoutes);
app.use("/api/hourly-rates", hourlyRatesRoutes);
app.use("/api/legal-files", legalFilesRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/notif", notifRoutes);
app.use("/api/absence", absenceRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/category", categoryRoutes);
app.use('/api/user', userRoutes)
app.use("/api/pdf", pdfRoutes);

export { app }
