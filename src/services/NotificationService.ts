import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createNotif (body) {
  const newNotif = await prisma.notification.create({
    data: body

  });
  return newNotif;
}

export async function getNotificationsByUserId(userId: number) {
  return await prisma.notification.findMany({
    where: {
      userId: {
        equals: userId
      }
    }
  });
}
