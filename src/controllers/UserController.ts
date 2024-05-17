import { Request, Response } from 'express'
import { prisma } from '../index'

export const getUsers = async (req: Request, res: Response) => {
    let users = await prisma.user.findMany().catch((error) => {
        console.error('Error fetching users:', error)
        res.status(500).json({ error: 'Error fetching users' })
    })
    res.status(200).json(users)
}