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
