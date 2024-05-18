import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type DocumentCreate = Prisma.Args<typeof prisma.document, "create">["data"];

export async function createDocument(values: DocumentCreate) {
  return await prisma.document
    .create({
      data: values,
    })
    .catch((err) => null);
}

export async function readDocument(id: number) {
  return await prisma.document
    .findUnique({
      where: {
        id,
      },
    })
    .catch((err) => null);
}

export async function readDocuments(values: {
  userId?: number;
  contributorId?: number | null;
  year?: number;
  type?:
    | "Resume"
    | "Diploma"
    | "CriminalRecord"
    | "KBIS"
    | "URSSAFCertificate"
    | "TaxCertificate";
}) {
  return await prisma.document
    .findMany({
      where: values,
    })
    .catch((err) => []);
}
