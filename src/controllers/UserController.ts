import { Request, Response } from "express";

import { readUserCompany } from "@/services/CompanyService";
import { getContractsByUserId } from "@/services/ContractService";

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
