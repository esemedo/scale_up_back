import { Request, Response } from "express";
import { kcAdminClient } from 'index';

export const getHello = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
};

export const getCompany = async (req: Request, res: Response) => {
  const users = await kcAdminClient.roles.findUsersWithRole({
      name: "speaker-company",
      });
      res.status(200).json(users)
  }