import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import helloRoutes from './routes/helloRoutes'
import needsRoutes from './routes/needsRoutes'
import promotionRoutes from './routes/promotionRoutes'
import subjectRoutes from './routes/subjectRoutes'
import contributorRoutes from './routes/contributorRoutes'
import categoryRoutes from './routes/categoryRoutes'
import userRoutes from './routes/userRoutes'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'

const app = express()

export const prisma = new PrismaClient()


app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api', helloRoutes)
app.use('/api/needs', needsRoutes)
app.use('/api/promotions', promotionRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/contributors', contributorRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)

export { app }
