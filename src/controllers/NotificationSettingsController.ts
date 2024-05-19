import { Request, Response } from "express";
import { prisma } from "../index";

export const getNotificationSettings = async (req: Request, res: Response) => {
  let notificationSettings = await prisma.notificationSettings
    .findMany()
    .catch((error) => {
      console.error("Error fetching notificationSettings:", error);
      res.status(500).json({ error: "Error fetching notificationSettings" });
    });
  res.status(200).json(notificationSettings);
};
