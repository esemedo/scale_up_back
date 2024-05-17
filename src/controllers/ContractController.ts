import { Request, Response } from "express";
import { getEndDate as getEndDateMiddleware } from "middlewares/contractMiddleware";

export const getEndDate = async (req: Request, res: Response) => {
  return getEndDateMiddleware(req, res);
};
