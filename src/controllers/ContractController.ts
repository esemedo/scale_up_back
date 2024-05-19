import { Request, Response } from "express";
import { prisma } from "../index";

export const getContracts = async (req: Request, res: Response) => {
  let contracts = await prisma.contract.findMany().catch((error) => {
    console.error("Error fetching contracts:", error);
    res.status(500).json({ error: "Error fetching contracts" });
  });
  res.status(200).json(contracts);
};
