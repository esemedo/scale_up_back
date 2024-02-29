import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllDEI = async (req: Request, res: Response) => {
    try {
        const deiEntries = await prisma.dei.findMany();
        res.json(deiEntries);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve DEI entries' });
    }
};

const updateStatusDEI = async (req: Request, res: Response) => {
    try {
        const {id} = req.body
       await prisma.dei.update({
            where: {
              id,
            },
            data: {
              status: true,
            },
          })
        res.json({message: "Task updated !"});

    } catch (error) {
        res.status(500).json({ error: 'Could not update DEI status ' });
    }
};
export { getAllDEI, updateStatusDEI };
