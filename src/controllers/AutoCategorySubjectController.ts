import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addSubjectIfNotExists = async (req: Request, res: Response) => {
  const { categoryId, subjectName } = req.body;

  try {
    const existingSubject = await prisma.subject.findFirst({
      where: {
        name: subjectName,
        categoryId: parseInt(categoryId),
      },
    });

    if (!existingSubject) {
      const newSubject = await prisma.subject.create({
        data: {
          name: subjectName,
          categoryId: parseInt(categoryId),
        },
      });
      
      // Envoyer une notification à l'acheteur(prendre le truc de nils)
      

      res.status(200).json({ message: "Matière ajoutée avec succès" });
    } else {
      res.status(200).json({ message: "La matière existe déjà dans la catégorie indiquée" });
    }
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur de serveur interne. Veuillez réessayer plus tard." });
  }
};
