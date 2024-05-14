import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

const readFields: Prisma.CompanyInclude = {
  contributorList: true,
};

export async function readCompany(id: number) {
  return await prisma.company.findUnique({
    where: {
      id,
    },
    include: readFields,
  });
}

export async function readUserCompany(userId: number) {
  return await prisma.company.findFirst({
    where: {
      userId,
    },
    include: readFields,
  });
}
