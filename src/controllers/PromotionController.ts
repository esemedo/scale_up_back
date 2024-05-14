import { Request, Response } from 'express'
import { prisma } from '../index'

export const getPromotions = async (req: Request, res: Response) => {
    let promotions = await prisma.promotion.findMany().catch((error) => {
        console.error('Error fetching promotions:', error)
        res.status(500).json({ error: 'Error fetching promotions' })
    })
    res.status(200).json(promotions)
}
