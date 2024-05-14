import { Request, Response } from "express";

import { getContributorsByCompanyId } from "@/services/ContributorService";

export const getCompanyContributors = async (req: Request, res: Response) => {
  const companyId: string = req.params.id;

  const company = await getContributorsByCompanyId(Number(companyId));

  res.json(company);
};
