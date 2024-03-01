import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import helloRoutes from './routes/helloRoutes'
import subjectRoutes from './routes/SubjectRoutes'
import promotionRoutes from './routes/PromotionRoutes'
import morgan from 'morgan'
import Keycloak from 'keycloak-connect'
import { PrismaClient } from '@prisma/client'
import { createUserIfNotExistsMiddleware } from './middlewares/createUserIfNotExistsMiddleware'

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

app.use('/api', helloRoutes)
app.use('/api/subject', subjectRoutes)
app.use('/api/promotion', promotionRoutes)

export { app };
