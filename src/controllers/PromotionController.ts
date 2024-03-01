import { Request, Response } from 'express'
import { prisma } from '../index'

export const getPromotions = async (req: Request, res: Response) => {
    let promotions = await prisma.promotion.findMany().catch((error) => {
        console.error('Error fetching promotions:', error)
        res.status(500).json({ error: 'Error fetching promotions' })
    })
    res.status(200).json(promotions)
}

export const getPromotionById = async (req: Request, res: Response) => {
    let promotionId = parseInt(req.params.promotionId)
    let promotion = await prisma.promotion.findUnique({
        where: {
            id: promotionId
        }
    }).catch((error) => {
        console.error('Error fetching promotion:', error)
        res.status(500).json({ error: 'Error fetching promotion' })
    })
    res.status(200).json(promotion)
}