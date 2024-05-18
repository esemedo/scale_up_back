import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type CreateContributorBody = Prisma.Args<
  typeof prisma.contributor,
  "create"
>["data"];

const readFields: Prisma.ContributorInclude = {
  exemptions: true,
  contributorToSubjects: {
    include: {
      subject: true,
    },
  },
};

export async function createContributor(values: CreateContributorBody) {
  return await prisma.contributor.create({
    data: values,
  });
}

export async function readContributor(id: number) {
  return await prisma.contributor.findUnique({
    where: {
      id,
    },
    include: readFields,
  });
}

export async function readCompanyContributors(companyId: number) {
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
