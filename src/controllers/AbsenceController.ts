import { Request, Response } from "express";
import { prisma } from "../index";

import {
  createAbsenceWithSubstitute,
  deleteAbsenceOfUser,
  getAbsencesOfUser,
  updateSubstitute,
} from "../services/AbsenceService";
import { createNotif } from "../services/NotificationService";

async function createAbsence(req: Request, res: Response) {
  const { startDate, endDate, reason, substitutUserId } = req.body;
  try {
    await createAbsenceWithSubstitute(
      (req as any).userId,
      startDate,
      endDate,
      reason,
      substitutUserId
    );
    if (substitutUserId !== null || substitutUserId)
      await createNotif({
        userId: substitutUserId,
        title: "Remplacement",
        text: `Vous avez été choisi comme remplaçant .`,
        category: 2,
        status: 0,
        dueDate: new Date(),
      });
    res.status(201).json({ message: "Absence created !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create absence" });
  }
}

async function updateSubstituteAbsence(req: Request, res: Response) {
  try {
    const { substitutUserId } = req.body;
    const { id } = req.params;
    const parsedId = parseInt(id);

    await updateSubstitute(parsedId, substitutUserId);
    await createNotif({
      userId: substitutUserId,
      title: "Remplacement",
      text: "Vous avez été choisi comme remplaçant.",
      category: 2,
      status: 0,
      dueDate: new Date(),
    });
    res.status(200).json({ message: "Absence updated !" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update absence" });
  }
}

async function deleteAbsence(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    await deleteAbsenceOfUser(parsedId);
    res.status(200).json({ message: "Absence deleted !" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete absence" });
  }
}
async function getAbsences(req: Request, res: Response) {
  try {
    const absence = await getAbsencesOfUser((req as any).userId);
    res.status(201).json(absence);
  } catch (error) {
    res.status(500).json({ error: "Can't get all absence" });
  }
}

export { createAbsence, deleteAbsence, getAbsences, updateSubstituteAbsence };
