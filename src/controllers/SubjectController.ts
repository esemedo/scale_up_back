import { Request, Response } from 'express'
import { prisma } from '../index'

export const getSubjects = async (req: Request, res: Response) => {
    let subjects = await prisma.subject.findMany().catch((error) => {
        console.error('Error fetching subjects:', error)
        res.status(500).json({ error: 'Error fetching subjects' })
    })
    res.status(200).json(subjects)
}

export const getSubjectsByCategory = async (req: Request, res: Response) => {
    let categoryId = parseInt(req.params.categoryId)
    let subjects = await prisma.subject.findMany({
        where: {
            categoryId: categoryId
        },
        select: {
            name: true
        }
    }).catch((error) => {
        console.error('Error fetching subjects:', error)
        res.status(500).json({ error: 'Error fetching subjects' })
    })
    res.status(200).json(subjects)
}
