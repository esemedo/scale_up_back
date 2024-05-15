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
import { IParams } from "@/utils/params";

export const addContributor = async (req: Request, res: Response) => {
  const contributor = req.body;

  const newContributor = await createContributor(contributor);

  res.json(newContributor);
};

export async function getContributorHandler(
  req: Request<IParams<ReadContributorParams>, any, any>,
  res: Response
) {
  const params = req.params;
  const contributorId = Number(params.id);

  const contributor = await readContributor(contributorId);

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
  req: Request<
    IParams<ReadContributorExemptionsParams>,
    any,
    any,
    ReadExemptionsQuery
  >,
  res: Response
) {
  const params = req.params;
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

export const removeContributor = async (
  req: Request<IParams<ReadContributorParams>>,
  res: Response
) => {
  const params = req.params;
  const contributorId = Number(params.id);

  const deletedContributor = await deleteContributorById(contributorId);

  res.json(deletedContributor);
};
