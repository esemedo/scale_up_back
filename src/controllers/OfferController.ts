import { Request, Response } from "express";
import {
  getAuthorId as getAuthorIdMiddleware,
  getOfferStatus as getOfferStatusMiddleware,
} from "middlewares/offerMiddleware";

export const getOfferId = async (req: Request, res: Response) => {
  return getAuthorIdMiddleware(req, res);
};

export const getOfferStatus = async (req: Request, res: Response) => {
  return getOfferStatusMiddleware(req, res);
};
