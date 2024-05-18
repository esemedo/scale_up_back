import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createNotif(body: any) {
  const newNotif = await prisma.notification
    .create({
      data: body,
    })
    .catch((err) => null);
  return newNotif;
}

export async function getNotificationsByUserId(userId: number) {
  return await prisma.notification
    .findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    })
    .catch((error) => []);
}
