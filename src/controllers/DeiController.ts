import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllDEI = async (req: Request, res: Response) => {
    try {
      const {priority } = req.query
      let whereClause = {}
      const parsedPriority = parseInt(String(priority))
      if (priority && !isNaN(parsedPriority)){
        whereClause = {priority: parsedPriority}}
        const deiEntries = await prisma.dei.findMany({
          where:whereClause,
          orderBy: [
            
            {
              id: 'desc',
            },
          ],
        });
        
        res.json(deiEntries);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve DEI entries' });
    }
};

const updateStatusDEI = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {status} = req.body

        await prisma.dei.update({
            where: {
              id: parseInt(id),
            },
            data: {
              status: Boolean(status),
            },
          })
          
        res.json({message: "Task updated !"});

    } catch (error) {
        res.status(500).json({ error: 'Could not update DEI status ' });
    }
};

const updateStatusSacha = async (req: Request, res: Response) => {
  try {
      const {id} = req.params
      const { sachaStatus} = req.body

      await prisma.dei.update({
          where: {
            id: parseInt(id),
          },
          data: {
            sashaStatus: sachaStatus
          },
        })
        
        
      res.json({message: "SACHA Status updated !"});

  } catch (error) {
      res.status(500).json({ error: 'Could not update SACHA status ' });
  }
};

const updatePriority = async (req: Request, res: Response) => {
  try {
      const {id} = req.params
      const { priority} = req.body

     await prisma.dei.update({
          where: {
            id: parseInt(id),
          },
          data: {
            priority: priority
          },
        })
        
      res.json({message: "Priotity updated !"});

  } catch (error) {
      res.status(500).json({ error: 'Could not update Priority ' });
  }
};
export { getAllDEI, updateStatusDEI, updateStatusSacha, updatePriority };
