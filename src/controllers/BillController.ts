import { Request, Response } from 'express'
import { prisma } from '../index'

export const getBills = async (req: Request, res: Response) => {
    let bills = await prisma.bill.findMany().catch((error) => {
        console.error('Error fetching bills:', error)
        res.status(500).json({ error: 'Error fetching bills' })
    })
    res.status(200).json(bills)
}

export const validateBill = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedBill = await prisma.bill.update({
            where: { id: parseInt(id) },
            data: { status: 1, validity: true },
        });
        res.status(200).json(updatedBill);
    } catch (error) {
        console.error('Error validating bill:', error);
        res.status(500).json({ error: 'Error validating bill' });
    }
};

export const cancelBill = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedBill = await prisma.bill.update({
            where: { id: parseInt(id) },
            data: { status: 2, validity: false },
        });
        res.status(200).json(updatedBill);
    } catch (error) {
        console.error('Error cancelling bill:', error);
        res.status(500).json({ error: 'Error cancelling bill' });
    }
};