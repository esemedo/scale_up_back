import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateNeedToDraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingNeed = await prisma.need.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingNeed) {
      return res.status(404).json({ error: "Déclaration de besoin non trouvée" });
    }

    const updatedNeed = await prisma.need.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: "Draft",
      },
    });

    res.status(200).json(updatedNeed);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur de serveur interne. Veuillez réessayer plus tard." });
  }
};

export const cancelDraftNeed = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingNeed = await prisma.need.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingNeed) {
      return res.status(404).json({ error: "Déclaration de besoin non trouvée" });
    }

    await prisma.need.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Déclaration de besoin annulée avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur de serveur interne. Veuillez réessayer plus tard." });
  }
};
