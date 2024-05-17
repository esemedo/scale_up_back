import { Request, Response } from 'express'
import { prisma } from '../index'

export const getHourlyRates = async (req: Request, res: Response) => {
    let hourlyRates = await prisma.hourlyRate.findMany().catch((error) => {
        console.error('Error fetching hourlyRates:', error)
        res.status(500).json({ error: 'Error fetching hourlyRates' })
    })
    res.status(200).json(hourlyRates)
}