<<<<<<< HEAD
import { Request, Response } from "express";
import { getEndDate as getEndDateMiddleware } from "middlewares/contractMiddleware";

export const getEndDate = async (req: Request, res: Response) => {
  return getEndDateMiddleware(req, res);
};
=======
import { Request, Response } from 'express'
import { prisma } from '../index'

export const getContracts = async (req: Request, res: Response) => {
    let contracts = await prisma.contract.findMany().catch((error) => {
        console.error('Error fetching contracts:', error)
        res.status(500).json({ error: 'Error fetching contracts' })
    })
    res.status(200).json(contracts)
}
>>>>>>> 4f3ef9ec787fb53b48753a3902a32987c384097a
