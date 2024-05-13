import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import needsRoutes from './routes/needsRoutes'
import promotionRoutes from './routes/promotionRoutes'
import subjectRoutes from './routes/subjectRoutes'
import contributorRoutes from './routes/contributorRoutes'
import categoryRoutes from './routes/categoryRoutes'
import userRoutes from './routes/userRoutes'
import deiRoutes from './routes/deiRoutes'
import notificationSettingsRoutes from './routes/notificationSettingsRoutes'
import dispensationsRoutes from './routes/dispensationsRoutes'
import hourlyRatesRoutes from './routes/hourlyRatesRoutes'
import legalFilesRoutes from './routes/legalFilesRoutes'
import offersRoutes from './routes/offersRoutes'
import purchaseOrderRoutes from './routes/purchaseOrderRoutes'
import quotationRoutes from './routes/quotationRoutes'
import schoolRoutes from './routes/schoolRoutes'
import syllabusRoutes from './routes/syllabusRoutes'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'

const app = express()

export const prisma = new PrismaClient()


app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/needs', needsRoutes)
app.use('/api/promotions', promotionRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/contributors', contributorRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/dei', deiRoutes)
app.use('/api/notification-settings', notificationSettingsRoutes)
app.use('/api/dispensations', dispensationsRoutes)
app.use('/api/hourly-rates', hourlyRatesRoutes)
app.use('/api/legal-files', legalFilesRoutes)
app.use('/api/offers', offersRoutes)
app.use('/api/purchase-orders', purchaseOrderRoutes)
app.use('/api/quotations', quotationRoutes)
app.use('/api/schools', schoolRoutes)
app.use('/api/syllabus', syllabusRoutes)

export { app }
