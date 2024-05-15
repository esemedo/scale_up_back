import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getContractsByUserId(userId: number) {
  return await prisma.contract.findMany({
    where: {
      signatoryId: {
        equals: userId,
      },
    },
  });
}



export async function getContracts() {
    const contracts = await prisma.contract.findMany();
    console.log(contracts)
    return contracts
  }