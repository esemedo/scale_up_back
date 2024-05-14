import { Request, Response } from "express";

import { readUserCompany } from "@/services/CompanyService";

export const getUserCompany = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  const company = await readUserCompany(Number(userId));

  res.json(company);
};
