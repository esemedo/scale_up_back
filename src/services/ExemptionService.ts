import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type ExemptionCreate = Prisma.Args<typeof prisma.exemption, "create">["data"];

export async function createExemption(values: ExemptionCreate) {
  return await prisma.exemption.create({
    data: values,
  });
}

export async function readExemptions(values: {
  contributorId?: number;
  subjectId?: number;
  status?: number;
}) {
  return await prisma.exemption.findMany({
    where: values,
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
