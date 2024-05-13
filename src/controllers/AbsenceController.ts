import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function createAbsence(req: Request, res: Response) {
  // id user en attendant keycloak  
    const { startDate, endDate, reason } = req.body;

    try {
      const absence = await prisma.absence.create({
        data: {
          startDate,
          endDate,
          reason,
          userId: req.userId,
        },
      });
      res.status(201).json(absence);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create absence' });
    }
  }
async function getAbsences(req: Request, res: Response) {
    try {
      const absence = await prisma.absence.findMany({
        where: {
          userId: req.userId,
        },
        orderBy: [
            
            {
              startDate: 'desc',
            },
          ],
      });
      res.status(201).json(absence);
    } catch (error) {
      res.status(500).json({ error: 'Can\'t get all absence' });
    }
  }

export {createAbsence, getAbsences}