import { Request, Response } from "express";
import { prisma } from "../index";

export const getContributors = async (req: Request, res: Response) => {
  let contributors = await prisma.contributor.findMany().catch((error) => {
    console.error("Error fetching contributors:", error);
    res.status(500).json({ error: "Error fetching contributors" });
  });
  res.status(200).json(contributors);
};
