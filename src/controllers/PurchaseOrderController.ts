import { Request, Response } from "express";
import { prisma } from "../index";

export const getPurchaseOrders = async (req: Request, res: Response) => {
  let purchaseOrders = await prisma.purchaseOrder.findMany().catch((error) => {
    console.error("Error fetching purchaseOrders:", error);
    res.status(500).json({ error: "Error fetching purchaseOrders" });
  });
  res.status(200).json(purchaseOrders);
};
