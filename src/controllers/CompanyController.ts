import { Request, Response } from "express";

import { readCompanyContributors } from "@/services/ContributorService";
import { readCompany } from "@/services/CompanyService";

export async function getCompany(req: Request, res: Response) {
  const companyId: string = req.params.id;

  const company = await readCompany(Number(companyId));

  res.json(company);
}

export const getCompanyContributors = async (req: Request, res: Response) => {
  const companyId: string = req.params.id;

  const company = await readCompanyContributors(Number(companyId));

  res.json(company);
};
