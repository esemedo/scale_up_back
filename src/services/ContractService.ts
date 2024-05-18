import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getContractsByUserId(userId: number) {
  return await prisma.contract
    .findMany({
      where: {
        signatoryId: {
          equals: userId,
        },
      },
    })
    .catch((error) => []);
}

export async function readContracts() {
  const contracts = await prisma.contract.findMany().catch((error) => []);
  return contracts;
}
