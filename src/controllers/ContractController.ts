import { Request, Response } from "express";


import { getContracts } from "../services/ContractService";


export const getAllContracts = async (req: Request, res: Response) => {
  // Récupérez l'ID de l'utilisateur de l'URL
  const userId: string = req.params.id;

  const structure = await getContracts();

  // Renvoyez les informations de l'entreprise en réponse à la demande
  res.json(structure);
};