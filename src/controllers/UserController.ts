import { Request, Response } from "express";

import { getNotificationsByUserId } from "../services/NotificationService";
import { readUserCompany } from "../services/CompanyService";
import { getContractsByUserId } from "../services/ContractService";
import { ReadUserParams } from "../dto/userDto";
import { readDocuments } from "../services/DocumentService";
import { ReadDocumentsQuery } from "../dto/documentDto";

export const getUserCompanyHandler = async (
  req: Request<ReadUserParams>,
  res: Response
) => {
  const params = req.params;
  const userId = Number(params.id);

  const company = await readUserCompany(userId);

  res.json(company);
};

export const getUserNotifications = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  const notifications = await getNotificationsByUserId(Number(userId));

  res.json(notifications);
};

export const getUserContractsHandler = async (
  req: Request<ReadUserParams>,
  res: Response
) => {
  // Récupérez l'ID de l'utilisateur de l'URL
  const params = req.params;
  const userId = Number(params.id);

  const contracts = await getContractsByUserId(userId);

  console.log(contracts);
  // Renvoyez les informations de l'entreprise en réponse à la demande
  res.json(contracts);
};

export const getUserDocumentsHandler = async (
  req: Request<ReadUserParams, any, any, ReadDocumentsQuery>,
  res: Response
) => {
  const params = req.params;
  const userId = Number(params.id);

  const query = req.query;
  const year = Number(query.year) || undefined;
  const type = query.type;

  const documents = await readDocuments({
    userId,
    contributorId: null,
    year,
    type,
  });

  res.json(documents);
};
