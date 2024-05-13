import { Request, Response } from 'express'
import { prisma } from '../index'

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany()
        res.json(categories)
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories.' })
    }
}