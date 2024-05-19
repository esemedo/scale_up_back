import { Request, Response } from "express";
import { prisma } from "../index";

export const getDispensations = async (req: Request, res: Response) => {
  let dispensations = await prisma.dispensation.findMany().catch((error) => {
    console.error("Error fetching dispensations:", error);
    res.status(500).json({ error: "Error fetching dispensations" });
  });
  res.status(200).json(dispensations);
};
