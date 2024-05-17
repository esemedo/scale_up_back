<<<<<<< HEAD
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
=======
import { Request, Response } from 'express'
import { prisma } from '../index'

export const getOffers = async (req: Request, res: Response) => {
    let offers = await prisma.offer.findMany().catch((error) => {
        console.error('Error fetching offers:', error)
        res.status(500).json({ error: 'Error fetching offers' })
    })
    res.status(200).json(offers)
}
>>>>>>> 4f3ef9ec787fb53b48753a3902a32987c384097a
