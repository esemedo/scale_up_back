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

export const importPromotions = async (req, res) => {
    let data = req.body.data;
    let managerId = req.body.managerId;

    if (!data) {
        res.status(400).json({ error: 'Request body is missing or malformed' });
        return;
    }

    try {
        data = JSON.parse(data);
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON format' });
        return;
    }

    const errors = [];
    for (let row of data) {
        try {
            await prisma.promotion.create({
                data: {
                    startSchoolYear: parseInt(row.startSchoolYear),
                    endSchoolYear: parseInt(row.endSchoolYear),
                    managerId: parseInt(managerId),
                },
            });
        } catch (error) {
            errors.push({ row, error });
        }
    }

    if (errors.length > 0) {
        res.status(400).json({ message: 'Some rows failed to import', errors });
    } else {
        res.status(200).json({ message: 'Data imported successfully' });
    }
};
