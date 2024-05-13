import { Request, Response } from 'express'
import { prisma } from '../index'

export const getBills = async (req: Request, res: Response) => {
    let bills = await prisma.bill.findMany().catch((error) => {
        console.error('Error fetching bills:', error)
        res.status(500).json({ error: 'Error fetching bills' })
    })
    res.status(200).json(bills)
}