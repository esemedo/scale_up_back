import { Request, Response } from "express";
import { prisma } from "../index";

export const getSchools = async (req: Request, res: Response) => {
  let schools = await prisma.school.findMany().catch((error) => {
    console.error("Error fetching schools:", error);
    res.status(500).json({ error: "Error fetching schools" });
  });
  res.status(200).json(schools);
};
