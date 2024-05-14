import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type CreateContributorBody = Prisma.Args<
  typeof prisma.contributor,
  "create"
>["data"];

export async function createContributor(values: CreateContributorBody) {
  return await prisma.contributor.create({
    data: values,
  });
}

export async function getContributorsByCompanyId(companyId: number) {
  return await prisma.contributor.findMany({
    where: {
      companyId,
    },
  });
}

export async function deleteContributorById(id: number) {
  return await prisma.contributor.delete({
    where: {
      id,
    },
  });
}
