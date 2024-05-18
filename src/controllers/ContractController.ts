import { Request, Response } from "express";

import { readContracts } from "../services/ContractService";

import { prisma } from "../index";

export const getAllContracts = async (req: Request, res: Response) => {
  // Récupérez l'ID de l'utilisateur de l'URL
  const userId: string = req.params.id;

  const structure = await readContracts();

  // Renvoyez les informations de l'entreprise en réponse à la demande
  res.json(structure);
};

export const getContracts = async (req: Request, res: Response) => {
  let contracts = await prisma.contract.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching contracts" });
  });
  res.status(200).json(contracts);
};
