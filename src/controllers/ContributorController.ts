import { Request, Response } from "express";

import {
  createContributor,
  deleteContributorById,
  readContributor,
} from "../services/ContributorService";
import { ReadExemptionsQuery } from "../dto/exemptionDto";
import { getStatusNumber } from "../libs/exemption";
import { readExemptions } from "../services/ExemptionService";
import {
  CreateContributorBody,
  ReadContributorExemptionsParams,
  ReadContributorParams,
} from "../dto/contributorDto";
import { readDocuments } from "../services/DocumentService";
import { ReadDocumentsQuery } from "../dto/documentDto";

import { prisma } from "../index";

export const addContributor = async (
  req: Request<any, any, CreateContributorBody>,
  res: Response
) => {
  const values = req.body;
  const newContributor = await createContributor(values);

  res.json(newContributor);
};

export async function getContributorHandler(
  req: Request<ReadContributorParams>,
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

export async function getContributorDocumentsHandler(
  req: Request<ReadContributorParams, any, any, ReadDocumentsQuery>,
  res: Response
) {
  const params = req.params;
  const contributorId = Number(params.id);

  const query = req.query;
  const year = Number(query.year) || undefined;
  const type = query.type;

  const contributorDocuments = await readDocuments({
    contributorId,
    year,
    type,
  });

  res.json(contributorDocuments);
}

export async function getContributorToSubjectExemptionsHandler(
  req: Request<ReadContributorExemptionsParams, any, any, ReadExemptionsQuery>,
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
  req: Request<ReadContributorParams>,
  res: Response
) => {
  const params = req.params;
  const contributorId = Number(params.id);

  const deletedContributor = await deleteContributorById(contributorId);

  res.json(deletedContributor);
};

export const getContributors = async (req: Request, res: Response) => {
  let contributors = await prisma.contributor.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching contributors" });
  });
  res.status(200).json(contributors);
};
