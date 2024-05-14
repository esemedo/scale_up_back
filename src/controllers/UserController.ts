import { Request, Response } from "express";

import { getCompanyByUserId } from "@/services/CompanyService";

export const getUserCompany = async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  const company = await getCompanyByUserId(Number(userId));

  res.json(company);
};
