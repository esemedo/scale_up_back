import { Request, Response } from 'express'
import { prisma } from '../index'

export const getCategories = async (req: Request, res: Response) => {
    let categories = await prisma.category.findMany().catch((error) => {
        console.error('Error fetching categories:', error)
        res.status(500).json({ error: 'Error fetching categories' })
    })
    res.status(200).json(categories)
}