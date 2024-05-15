import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const regroupPromotionsForCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { promotionIds } = req.body;

  try {
    const subjects = await prisma.subject.findMany({
      where: {
        categoryId: parseInt(categoryId),
      },
      include: {
        hourlyRates: true, 
      },
    });

    if (subjects.length === 0) {
      return res.status(404).json({ error: "Aucune matière trouvée pour cette catégorie" });
    }

    const allPromotions = await prisma.promotion.findMany();

    const promotions = allPromotions.filter(promotion =>
      promotionIds.includes(promotion.id.toString())
    );

    if (promotions.length !== promotionIds.length) {
      return res.status(404).json({ error: "Certaines promotions n'existent pas" });
    }

    let totalPrice = 0;
    subjects.forEach(subject => {
      const subjectTotalPrice = subject.hourlyRates.reduce((acc, rate) => acc + rate.rate, 0);
      promotions.forEach(promotion => {
        // TODO : Remplacer discountRate codé en dur par la valeur réelle lorsqu'elle est disponible dans le modèle
        const discountRate = 0.1; // 10% discount
        totalPrice += subjectTotalPrice * discountRate;
      });
    });

    res.status(200).json({ subjects, promotions, totalPrice });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur de serveur interne. Veuillez réessayer plus tard." });
  }
};