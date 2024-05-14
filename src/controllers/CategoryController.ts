import { Request, Response } from "express";
import { prisma } from "../index";

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Catégorie non trouvée" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Erreur de serveur interne. Veuillez réessayer plus tard.",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const existingCategory = await prisma.category.findFirst({
    where: {
      name: name,
    },
  });

  if (existingCategory) {
    return res.status(404).json({ error: `La catégorie à créer existe déjà` });
  }

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });
  res.status(200).json(newCategory);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!existingCategory) {
    return res
      .status(404)
      .json({ error: `La catégorie à mettre à jour n'existe pas.` });
  }
  const existingnewCategory = await prisma.category.findFirst({
    where: {
      name: name,
    },
  });
  if (existingnewCategory) {
    return res.status(404).json({ error: `La catégorie à créer existe déjà.` });
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });

  res.status(200).json(updatedCategory);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!existingCategory) {
    return res
      .status(404)
      .json({ error: `La catégorie à supprimer n'existe pas.` });
  }

  await prisma.category.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(200).json({ message: `Catégorie supprimée avec succès` });
};
