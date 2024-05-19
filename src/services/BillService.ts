import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type BillCreate = Prisma.Args<typeof prisma.bill, "create">["data"];

export async function createBill(values: BillCreate) {
  return await prisma.bill
    .create({
      data: values,
    })
    .catch((err) => null);
}

export async function readBill(id: number) {
  return await prisma.bill
    .findUnique({
      where: {
        id,
      },
    })
    .catch((err) => null);
}
