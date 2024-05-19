import { Request, Response } from "express";
import { prisma } from "../index";

export const getQuotations = async (req: Request, res: Response) => {
  let quotations = await prisma.quotation.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching quotations" });
  });
  res.status(200).json(quotations);
};
