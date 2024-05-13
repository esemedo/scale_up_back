import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const addHourlyRate = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { level, subjectId, rate, realRate } = req.body;
    await prisma.hourlyRate.create({
      data: {
        level,
        subjectId,
        rate,
        realRate,
      },
    });
    res.status(200).json({ message: "Hourly rate created successfully" });
  } catch (error) {
    console.error("Error creating hourly rate");
    console.error(error);
    res.status(500).json({ message: "Failed to create hourly rate" });
  }
};

export const getAllHourlyRates = async (req: Request, res: Response) => {
  try {
    const hourlyRates = await prisma.hourlyRate.findMany();
    res.status(200).json({ hourlyRates, message: "Hourly rates fetched successfully" });
  } catch (error) {
    console.error("Error fetching hourly rates:", error);
    res.status(500).json({ message: "Failed to fetch hourly rates" });
  }
};


export const getHourlyRateById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const hourlyRate = await prisma.hourlyRate.findUnique({
      where: {
        id,
      },
    });
    if (hourlyRate) {
      res.status(200).json({ message: "Hourly rate fetched successfully" });
    } else {
      res.status(404).json({ message: "Hourly rate not found" });
    }
  } catch (error) {
    console.error("Error fetching hourly rate:");
    res.status(500).json({ message: "Failed to fetch hourly rate" });
  }
};

export const updateHourlyRate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { level, subjectId, rate, realRate } = req.body;
    await prisma.hourlyRate.update({
      where: {
        id,
      },
      data: {
        level,
        subjectId,
        rate,
        realRate,
      },
    });
    res.status(200).json({ message: "Hourly rate updated successfully" });
  } catch (error) {
    console.error("Error updating hourly rate:");
    if (error.code === "P2025") {
      res.status(404).json({ message: "Hourly rate not found" });
    } else {
      res.status(500).json({ message: "Failed to update hourly rate" });
    }
  }
};

export const updateHourlyRateRealRate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { realRate } = req.body;
    await prisma.hourlyRate.update({
      where: {
        id,
      },
      data: {
        realRate,
      },
    });
    res.status(200).json({ message: "Hourly rate updated successfully" });
  } catch (error) {
    console.error("Error updating hourly rate:");
    if (error.code === "P2025") {
      res.status(404).json({ message: "Hourly rate not found" });
    } else {
      res.status(500).json({ message: "Failed to update hourly rate" });
    }
  }
};

export const deleteHourlyRate = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.hourlyRate.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Hourly rate deleted successfully" });
  } catch (error) {
    console.error("Error deleting hourly rate:");
    if (error.code === "P2025") {
      res.status(404).json({ message: "Hourly rate not found" });
    } else {
      res.status(500).json({ message: "Failed to delete hourly rate" });
    }
  }
};

export const getAllSubjectsNames = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.Subject.findMany();
    const formattedSubjects = subjects.map(({ id, name }) => ({ id, name }));
    res.status(200).json({ subjects: formattedSubjects, message: "Subjects fetched successfully" });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};
