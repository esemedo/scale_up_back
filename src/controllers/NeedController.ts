import { Request, Response } from "express";
import { prisma } from "../index";
import { createNotif } from "../services/NotificationService";

export const getNeeds = async (req: Request, res: Response) => {
  let needs = await prisma.need
    .findMany({
      include: {
        subject: true,
      },
    })
    .catch((error) => {
      console.error("Error fetching needs:", error);
      res.status(500).json({ error: "Error fetching needs" });
    });
  res.status(200).json(needs);
};

export const updateNeedToDraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  const STATUS = {
    DRAFT: 4,
    PUBLISHED: 3,
    CANCELLED: 0,
  };

  try {
    const existingNeed = await prisma.need.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingNeed) {
      return res
        .status(404)
        .json({ error: "Déclaration de besoin non trouvée" });
    }

    const updatedNeed = await prisma.need.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: STATUS.DRAFT,
      },
    });

    res.status(200).json(updatedNeed);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur de serveur interne. Veuillez réessayer plus tard.",
    });
  }
};

export const updateNeedToPublished = async (req: Request, res: Response) => {
  const { id } = req.params;
  const STATUS = {
    DRAFT: 4,
    PUBLISHED: 3,
    CANCELLED: 0,
  };

  try {
    const existingNeed = await prisma.need.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingNeed) {
      return res
        .status(404)
        .json({ error: "Déclaration de besoin non trouvée" });
    }

    const updatedNeed = await prisma.need.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: STATUS.PUBLISHED,
      },
    });

    res.status(200).json(updatedNeed);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur de serveur interne. Veuillez réessayer plus tard.",
    });
  }
};

export const cancelDraftNeed = async (req: Request, res: Response) => {
  const { id } = req.params;

  const STATUS = {
    DRAFT: 4,
    PUBLISHED: 3,
    CANCELLED: 0,
  };

  try {
    const existingNeed = await prisma.need.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingNeed) {
      return res
        .status(404)
        .json({ error: "Déclaration de besoin non trouvée" });
    }

    await prisma.need.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: STATUS.CANCELLED,
      },
    });

    res
      .status(200)
      .json({ message: "Déclaration de besoin annulée avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur de serveur interne. Veuillez réessayer plus tard.",
    });
  }
};

export const getNeedsByYear = async (req: Request, res: Response) => {
  let year = req.params.year;
  let startYears = year.split("-");
  let startYear = startYears[0];
  let endYear = startYears[1];
  let needs = await prisma.need
    .findMany({
      where: {
        AND: [
          {
            startSchoolYear: {
              equals: parseInt(startYear),
            },
          },
          {
            endSchoolYear: {
              equals: parseInt(endYear),
            },
          },
        ],
      },
    })
    .catch((error) => {
      console.error("Error fetching needs:", error);
      res.status(500).json({ error: "Error fetching needs" });
    });
  res.status(200).json(needs);
};

export const createNeed = async (req: Request, res: Response) => {
  let need = req.body;
  let newNeed = await prisma.need
    .create({
      data: need,
    })
    .catch((error) => {
      console.error("Error creating need:", error);
      res.status(500).json({ error: "Error creating need" });
    });
  await createNotif({
    userId: req.userId,
    title: "Besoin créé",
    text: `Votre demande de besoin a été créée avec succès`,
    category: 1,
    status: 0,
    dueDate: new Date(),
  });
  res.status(201).json(newNeed);
};
