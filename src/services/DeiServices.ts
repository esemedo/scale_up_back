import { prisma } from "index";


export  async function createPurchaseOrderAndUpdateDei(taskId, fileUrl, data) {
  try {
  const transaction = await prisma.$transaction(async (prisma) => {
      const newPurchaseOrder = await prisma.purchaseOrder.create({
        data: {
          fileUrl: fileUrl,
          dei: {
            connect: { id: taskId },
          },
        },
      });

      const updatedDei = await prisma.dei.update({
        where: { id: taskId },
        include: {quotation:true, contract:true},
        data: {
            ...data,
          purchaseOrder: {
            connect: { id: newPurchaseOrder.id },
          },
        },
      });

      return { newPurchaseOrder, updatedDei };
    });
    return transaction
  } catch (error) {
    console.error('Error updating task and creating order:', error);
    throw error
} finally {
    await prisma.$disconnect();
  }
}
