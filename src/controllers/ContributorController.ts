import { Request, Response } from "express";

import {
  createContributor,
  deleteContributorById,
  readContributor,
} from "@/services/ContributorService";
import { ReadExemptionsQuery } from "@/dto/exemptionDto";
import { getStatusNumber } from "@/libs/exemption";
import { readExemptions } from "@/services/ExemptionService";
import {
  ReadContributorExemptionsParams,
  ReadContributorParams,
} from "@/dto/contributorDto";

export const addContributor = async (req: Request, res: Response) => {
  const contributor = req.body;

  const newContributor = await createContributor(contributor);

  res.json(newContributor);
};

export async function getContributorHandler(req: Request, res: Response) {
  const contributorId = req.params.id;

  const contributor = await readContributor(Number(contributorId));

  res.json(contributor);
}

export async function getContributorExemptionsHandler(
  req: Request<any, any, any, ReadExemptionsQuery>,
  res: Response
) {
  const params = req.params as ReadContributorParams;
  const contributorId = Number(params.id);

  const { status } = req.query;
  const statusNumber = getStatusNumber(status);

  const contributorExemptions = await readExemptions({
    contributorId,
    status: statusNumber,
  });

  res.json(contributorExemptions);
}

export async function getContributorToSubjectExemptionsHandler(
  req: Request<any, any, any, ReadExemptionsQuery>,
  res: Response
) {
  const params = req.params as ReadContributorExemptionsParams;
  const contributorId = Number(params.id);
  const subjectId = Number(params.subjectId);

  const { status } = req.query;
  const statusNumber = getStatusNumber(status);

  const contributorExemptions = await readExemptions({
    contributorId,
    subjectId,
    status: statusNumber,
  });

  res.json(contributorExemptions);
}

export const removeContributor = async (req: Request, res: Response) => {
  const contributorId = req.params.id;

  const deletedContributor = await deleteContributorById(Number(contributorId));

  res.json(deletedContributor);
};
