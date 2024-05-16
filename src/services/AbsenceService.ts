import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAbsenceWithSubstitute(userId, startDate, endDate, reason, substituteUserId) {
  return prisma.absence.create({
    data: {
      startDate,
      endDate,
      reason,
      userId,
      substituteUserId,
    },
  });
}

export async function getSubstitutOrUser(userId, currentDate) {
    const absence = await prisma.absence.findFirst({
      where: {
        userId,
        startDate: { lte: currentDate },
        endDate: { gte: currentDate },
      },
      include: {
        substituteUser: true,
      },
    });
  
    const userToCheck = absence?.substituteUserId || absence?.userId || userId;
    return userToCheck
}

export async function updateSubstitute(id, substituteUserId) {
    return await prisma.absence.update({
        where: {
            id,
          },
      data: {
        substituteUserId
      },
      
    });
}

export async function deleteAbsenceOfUser(id) {
  return await prisma.absence.delete({
      where: {
          id,
        },
    
  });
}

export async function getAbsencesOfUser(userId){
    return await prisma.absence.findMany({
        where: {
          userId: userId,
        },
        include:{substituteUser:true},
        orderBy: [
            
            {
              startDate: 'asc',
            },
          ],
      });
}
