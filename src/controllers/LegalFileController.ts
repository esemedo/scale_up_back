import { Request, Response } from "express";
import { prisma } from "../index";

export const getLegalFiles = async (req: Request, res: Response) => {
  let legalFiles = await prisma.legalFile.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching legalFiles" });
  });
  res.status(200).json(legalFiles);
};
