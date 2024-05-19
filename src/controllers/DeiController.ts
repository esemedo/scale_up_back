import { Request, Response } from "express";
import { prisma } from "../index";

export const getDeis = async (req: Request, res: Response) => {
  let deis = await prisma.dei.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching deis" });
  });
  res.status(200).json(deis);
};
