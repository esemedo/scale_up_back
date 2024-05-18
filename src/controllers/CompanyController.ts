import { Request, Response } from "express";

import { readCompanyContributors } from "../services/ContributorService";
import { readCompany } from "../services/CompanyService";
import { ReadCompanyParams } from "../dto/companyDto";

import { prisma } from "../index";

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

export const getCompanies = async (req: Request, res: Response) => {
  let companies = await prisma.company.findMany().catch((error) => {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Error fetching companies" });
  });
  res.status(200).json(companies);
};
