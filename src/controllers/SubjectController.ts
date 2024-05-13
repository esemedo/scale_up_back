import { Request, Response } from "express";
import { prisma } from "../index";

export const getAllSubjects = async (req: Request, res: Response) => {
  const subjects = await prisma.subject.findMany();
  res.status(200).json(subjects);
};

export const getSubjectsByCategoryId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const subjects = await prisma.subject.findMany({
      where: {
        categoryId: parseInt(id),
      },
    });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      error: "Erreur de serveur interne. Veuillez réessayer plus tard.",
    });
  }
};

export const getSubjectsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const subjects = await prisma.subject.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (subjects) {
      res.status(200).json(subjects);
    } else {
      res.status(404).json({ error: "Matière/module non trouvée" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Erreur de serveur interne. Veuillez réessayer plus tard.",
    });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  const { name, level, categoryId } = req.body;

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: parseInt(categoryId),
    },
  });
  if (!existingCategory) {
    return res.status(404).json({
      error: `La category que vous voulez utilisé pour créer la matière/module n'existe pas.`,
    });
  }
  const existingSubjectName = await prisma.subject.findFirst({
    where: {
      name: name,
    },
  });
  if (existingSubjectName) {
    return res
      .status(404)
      .json({ error: `Le nom de la matière/module à créer existe déjà` });
  }

  const newSubject = await prisma.subject.create({
    data: {
      name,
      level,
      categoryId,
    },
  });
  res.status(200).json(newSubject);
};

export const updateSubject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, level, categoryId } = req.body;

  const existingSubject = await prisma.subject.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!existingSubject) {
    return res
      .status(404)
      .json({ error: `La matière/module à mettre à jour n'existe pas.` });
  }

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: parseInt(categoryId),
    },
  });

  if (!existingCategory) {
    return res.status(404).json({
      error: `La category que vous voulez utilisé pour mettre la matière/module à jour n'existe pas.`,
    });
  }

  const updatedSubject = await prisma.subject.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      level,
      categoryId,
    },
  });
  res.status(200).json(updatedSubject);
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingSubject = await prisma.subject.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingSubject) {
      return res
        .status(404)
        .json({ error: `La matière/module à supprimer n'existe pas.` });
    }

    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
    res
      .status(200)
      .json({ message: "Le module a été correctement supprimé !" });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression du module.",
    });
  }
};