import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const getEndDate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contract = await prisma.contract.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                endDate: true,
            },
        });
        if (contract) {
            res.status(200).json({ endDate: contract.endDate });
        } else {
            res.status(404).json({ message: "Contract not found" });
        }
    } catch (error) {
        console.error("Error fetching contract:");
        res.status(500).json({ message: "Failed to fetch contract" });
    }
}