import { Request, Response } from "express";

import {
  createExemption,
  readExemptionByContributorIdAndSubjectId,
  readExemption,
  readExemptions,
  updateExemption,
} from "@/services/ExemptionService";
import {
  CreateExemptionBody,
  ReadExemptionsQuery,
  UpdateExemptionParams,
  UpdateExemptionQuery,
  updateExemptionQuerySchema,
} from "@/dto/exemptionDto";
import { getStatusNumber } from "@/libs/exemption";

export async function createExemptionRequestHandler(
  req: Request<any, any, CreateExemptionBody>,
  res: Response
) {
  const exemptionRequest = req.body;

  const existingExemption = await readExemptionByContributorIdAndSubjectId(
    exemptionRequest.contributorId,
    exemptionRequest.subjectId
  );

  if (existingExemption && existingExemption.status === 0) {
    return res.status(400).json({
      message:
        "Contributor already has a pending exemption request for this subject",
    });
  }

  const newExemptionRequest = await createExemption(exemptionRequest);
  res.status(201).json(newExemptionRequest);
}

export async function getExemptionsHandler(
  req: Request<any, any, any, ReadExemptionsQuery>,
  res: Response
) {
  const { status } = req.query;
  const statusNumber = getStatusNumber(status);
  const exemptions = await readExemptions({ status: statusNumber });

  res.json(exemptions);
}

export async function processExemptionRequestHandler(
  req: Request<any, any, any, UpdateExemptionQuery>,
  res: Response
) {
  const params: UpdateExemptionParams = req.params;
  const id = Number(params.id);

  const existingExemptionRequest = await readExemption(id);

  if (!existingExemptionRequest) {
    return res.status(404).json({ message: "Exemption request not found" });
  }

  if (existingExemptionRequest.status !== 0) {
    return res.status(400).json({
      message: "Exemption request has already been processed",
    });
  }

  const { action } = req.query;

  let updatedExemptionRequest: Awaited<ReturnType<typeof updateExemption>>;
  if (action === updateExemptionQuerySchema.shape.action.enum.approve) {
    updatedExemptionRequest = await updateExemption(id, {
      status: 1,
      approvalDate: new Date(),
    });
  } else {
    updatedExemptionRequest = await updateExemption(id, {
      status: 2,
    });
  }

  res.json(updatedExemptionRequest);
}
