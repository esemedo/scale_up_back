<<<<<<< HEAD
import { Request, Response } from 'express';
import {
    deleteQuotation as deleteQuotationMiddleware,
    selectAllQuotations as selectAllQuotationsMiddleware,
    selectQuotation as selectQuotationMiddleware,
    updateQuotation as updateQuotationMiddleware,
    updateQuotationStatus as updateQuotationStatusMiddleware,
    createQuotation as createQuotationMiddleware
} from '../middlewares/quotationMiddleware';

export const selectQuotation = async (req: Request, res: Response) => {
  return selectQuotationMiddleware(req, res);
};

export const updateQuotationStatus = async (req: Request, res: Response) => {
  return updateQuotationStatusMiddleware(req, res);
};

export const selectAllQuotations = async (req: Request, res: Response) => {
  return selectAllQuotationsMiddleware(req, res);
};

export const deleteQuotation = async (req: Request, res: Response) => {
  return deleteQuotationMiddleware(req, res);
};

export const updateQuotation = async (req: Request, res: Response) => {
  return updateQuotationMiddleware(req, res);
};

export const createQuotation = async (req: Request, res: Response) => {
  return createQuotationMiddleware(req, res);
};
=======
import { Request, Response } from 'express'
import { prisma } from '../index'

export const getQuotations = async (req: Request, res: Response) => {
    let quotations = await prisma.quotation.findMany().catch((error) => {
        console.error('Error fetching quotations:', error)
        res.status(500).json({ error: 'Error fetching quotations' })
    })
    res.status(200).json(quotations)
}
>>>>>>> 4f3ef9ec787fb53b48753a3902a32987c384097a
