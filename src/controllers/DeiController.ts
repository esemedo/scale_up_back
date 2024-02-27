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

export { getAllDEI };
