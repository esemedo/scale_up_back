import { Request, Response } from 'express'
import { prisma } from '../index'

export const getOffers = async (req: Request, res: Response) => {
    let offers = await prisma.offer.findMany().catch((error) => {
        console.error('Error fetching offers:', error)
        res.status(500).json({ error: 'Error fetching offers' })
    })
    res.status(200).json(offers)
}