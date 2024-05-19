import { Request, Response } from "express";
import { prisma } from "../index";

export const getPromotions = async (req: Request, res: Response) => {
  let promotions = await prisma.promotion.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching promotions" });
  });
  res.status(200).json(promotions);
};

export const getPromotionById = async (req: Request, res: Response) => {
  try {
    let promotionId = parseInt(req.params.promotionId);
    let promotion = await prisma.promotion.findUnique({
      where: {
        id: promotionId,
      },
    });
    res.status(200).json(promotion);
  } catch (error) {
    console.error("Error fetching promotion:", error);
    return res.status(500).json({ error: "Error fetching promotion" });
  }
};

export const importPromotions = async (req: Request, res: Response) => {
  let data = req.body.data;
  let managerId = req.body.managerId;

  if (!data) {
    res.status(400).json({ error: "Request body is missing or malformed" });
    return;
  }

  try {
    data = JSON.parse(data);
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON format" });
    return;
  }

  const errors = [];
  for (let row of data) {
    try {
      await prisma.promotion.create({
        data: {
          name: row.name,
          startSchoolYear: parseInt(row.startSchoolYear),
          endSchoolYear: parseInt(row.endSchoolYear),
          managerId: parseInt(managerId),
        },
      });
    } catch (error) {
      errors.push({ row, error });
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Some rows failed to import", errors });
  } else {
    res.status(200).json({ message: "Data imported successfully" });
  }
};

export const getAssistantsForPromotion = async (
  req: Request,
  res: Response
) => {
  try {
    const promotion = await prisma.promotion.findMany({
      include: { manager: true, assistant: true },
      where: {
        assistantId: {
          not: null,
        },
      },
    });

    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    return res.status(200).json(promotion);
  } catch (error) {
    console.error("Error getting assistants for promotion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addAssistantToPromotion = async (req: Request, res: Response) => {
  const { promotionId } = req.params;
  const { assistantId } = req.body;

  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id: parseInt(promotionId) },
    });

    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    const assistant = await prisma.user.findUnique({
      where: { id: parseInt(assistantId) },
    });

    if (!assistant) {
      return res.status(404).json({ error: "Assistant not found" });
    }

    const updatedPromotion = await prisma.promotion.update({
      where: { id: parseInt(promotionId) },
      data: {
        assistantId: parseInt(assistantId),
      },
      include: { assistant: true },
    });

    return res.status(200).json(updatedPromotion);
  } catch (error) {
    console.error("Error adding assistant to promotion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
