import { Request, Response } from "express";
import { prisma } from "../index";

export const getNeeds = async (req: Request, res: Response) => {
  let needs = await prisma.need.findMany().catch((error) => {
    res.status(500).json({ error: "Error fetching needs" });
  });
  res.status(200).json(needs);
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
      res.status(500).json({ error: "Error creating need" });
    });
  res.status(201).json(newNeed);
};
