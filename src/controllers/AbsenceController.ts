import { Request, Response } from "express";
import { prisma } from "../index";

export const getAbsences = async (req: Request, res: Response) => {
  let absences = await prisma.absence.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching absences" });
  });
  res.status(200).json(absences);
};
