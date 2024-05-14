import { prisma } from "@/prisma";

export async function getCompanyByUserId(userId: number) {
  return await prisma.company.findFirst({
    where: {
      userId,
    },
  });
}
