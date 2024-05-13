import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const calculateTotalHoursForNeed = async (req: Request, res: Response) => {
  const { needId } = req.params;

  try {
    const subjects = await prisma.subject.findMany({
      where: {
        needs: {
          some: {
            id: parseInt(needId),
          },
        },
      },
    });

    let totalHours = 0;
    subjects.forEach((subject) => {
      totalHours += subject.hoursVolume;
    });

    await prisma.need.update({
      where: {
        id: parseInt(needId),
      },
      data: {
        totalHours: totalHours,
      },
    });

    res.status(200).json({ message: "Volume total d'heures calculé avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur de serveur interne. Veuillez réessayer plus tard." });
  }
};
