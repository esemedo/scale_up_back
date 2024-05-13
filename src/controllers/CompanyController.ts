import { Request, Response } from 'express'
import { prisma } from '../index'

export const getCompanies = async (req: Request, res: Response) => {
    let companies = await prisma.company.findMany().catch((error) => {
        console.error('Error fetching companies:', error)
        res.status(500).json({ error: 'Error fetching companies' })
    })
    res.status(200).json(companies)
}