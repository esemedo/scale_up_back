import { Request, Response } from 'express'
import { prisma } from '../index'

export const getSyllabus = async (req: Request, res: Response) => {
    let syllabus = await prisma.syllabus.findMany().catch((error) => {
        console.error('Error fetching syllabus:', error)
        res.status(500).json({ error: 'Error fetching syllabus' })
    })
    res.status(200).json(syllabus)
}