import { Request, Response } from "express";
import { getStructureByUserId } from "../services/StructureService";

import { readUserCompany } from "@/services/CompanyService";
import { getContractsByUserId } from "../services/ContractService";

export const getUserCompany = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  const company = await readUserCompany(Number(userId));

  res.json(company);
};


export const getUserContracts = async (req: Request, res: Response) => {
  // Récupérez l'ID de l'utilisateur de l'URL
  const userId: string = req.params.id;

  const contracts = await getContractsByUserId(Number(userId));

  console.log(contracts);
  // Renvoyez les informations de l'entreprise en réponse à la demande
  res.json(contracts);
};

export const getUserStructure = async (req: Request, res: Response) => {
  // Récupérez l'ID de l'utilisateur de l'URL
  const userId: string = req.params.id;

  const structure = await getStructureByUserId(Number(userId));

  // Renvoyez les informations de l'entreprise en réponse à la demande
  res.json(structure);
};
