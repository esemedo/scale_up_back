import { Request, Response } from "express";

import { getNotificationsByUserId } from "../services/NotificationService";
import { readUserCompany } from "../services/CompanyService";
import { getContractsByUserId } from "../services/ContractService";
import { ReadUserParams } from "../dto/userDto";
import { readDocuments } from "../services/DocumentService";
import { ReadDocumentsQuery } from "../dto/documentDto";

import { prisma } from "../index";

import { kcAdminClient } from "index";

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
  const params = req.params;
  const userId = Number(params.id);

  const contracts = await getContractsByUserId(userId);

  console.log(contracts);
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

export const getUsers = async (req: Request, res: Response) => {
  try {
    let users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Error fetching users" });
  }
};

export async function createUsersIfNotExists(usersData: any) {
  try {
    const promises = usersData.map(async (userData: any) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          uuid: userData.id,
        },
      });
      if (!existingUser) {
        return prisma.user.create({
          data: {
            uuid: userData.id,
          },
        });
      } else {
        return existingUser;
      }
    });
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error("Error creating users:", error);
    return [];
  }
}

function mergeArrays(array1: any[], array2: any[]) {
  const uuidMap = array2.reduce((acc, obj) => {
    acc[obj.uuid] = obj.id;
    return acc;
  }, {});

  const mergedArray = array1.map((obj) => ({
    name: `${obj.firstName} ${obj.lastName}`,
    id: uuidMap[obj.id],
  }));
  return mergedArray;
}

export const getAllAssistants = async (req: Request, res: Response) => {
  try {
    const users = await kcAdminClient.roles.findUsersWithRole({
      name: "educational-assistant",
    });

    if (!users) {
      return res.status(400).json([]);
    }

    const usersCreated = await createUsersIfNotExists(users);
    const usersObject = mergeArrays(users, usersCreated);
    res.status(200).json(usersObject);
  } catch (error) {
    res.status(500).json({ error: "Can't get all assistants" });
    console.log(error);
  }
};
