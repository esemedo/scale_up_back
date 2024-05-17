import { prisma } from 'index';
import { createNotif } from 'services/NotificationService';


export async function checkTasksAndNotify() {
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

  const tasks = await prisma.dei.findMany({
    where: {
      dueDate: {
        lte: oneWeekFromNow,
        gte: new Date(),
      },
    },
    include:{need:{include:{promotion:true}}}
  });

  for (const task of tasks) {
    await createNotif({
        userId: task.need.promotion.assistantId,
        title: "Urgent ! La tâche expire bientôt !", 
        text: `La tâche n°${task.id} arrive dans peu temps à échéance. La date limite est le ${task.dueDate}. N'oubliez pas de vous en occupée.`,
        category:1, 
        status:task.status,
        dueDate: task?.dueDate
      });
 
  }

}



