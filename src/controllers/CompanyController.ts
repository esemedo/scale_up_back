import { Request, Response } from "express";

import { readCompanyContributors } from "@/services/ContributorService";
import { readCompany } from "@/services/CompanyService";
import { ReadCompanyParams } from "@/dto/companyDto";

export async function getCompany(
  req: Request<ReadCompanyParams>,
  res: Response
) {
  const params = req.params;
  const companyId = Number(params.id);

  const company = await readCompany(companyId);

  res.json(company);
}

export const getCompanyContributors = async (
  req: Request<ReadCompanyParams>,
  res: Response
) => {
  const params = req.params;
  const companyId = Number(params.id);

  const company = await readCompanyContributors(companyId);

  res.json(company);
};
