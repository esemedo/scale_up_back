import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type ExemptionCreateBody = Prisma.Args<
  typeof prisma.exemption,
  "create"
>["data"];

export async function createExemption(values: ExemptionCreateBody) {
  return await prisma.exemption.create({
    data: values,
  });
}

export async function readExemptions(values: {
  contributorId?: number;
  subjectId?: number;
  statusNumber?: number;
}) {
  return await prisma.exemption.findMany({
    where: {
      contributorId: values.contributorId,
      subjectId: values.subjectId,
      status: values.statusNumber,
    },
  });
}

export async function readExemption(id: number) {
  return await prisma.exemption.findUnique({
    where: {
      id,
    },
  });
}

export async function readExemptionByContributorIdAndSubjectId(
  contributorId: number,
  subjectId: number
) {
  return await prisma.exemption.findFirst({
    where: {
      contributorId,
      subjectId,
    },
    orderBy: {
      requestDate: "desc",
    },
  });
}

export async function updateExemption(
  id: number,
  exemptionRequest: Prisma.ExemptionUpdateInput
) {
  return await prisma.exemption.update({
    where: {
      id,
    },
    data: exemptionRequest,
  });
}
