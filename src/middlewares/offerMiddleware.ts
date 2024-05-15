import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const getAuthorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const offer = await prisma.offer.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                authorId: true,
            },
        });
        if (offer) {
            res.status(200).json({ authorId: offer.authorId });
        } else {
            res.status(404).json({ message: "Offer not found" });
        }
    } catch (error) {
        console.error("Error fetching offer:");
        res.status(500).json({ message: "Failed to fetch offer" });
    }
};

export const getOfferStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const offer = await prisma.offer.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                status: true,
            },
        });
        if (offer) {
            res.status(200).json({ status: offer.status });
        } else {
            res.status(404).json({ message: "Offer not found" });
        }
    } catch (error) {
        console.error("Error fetching offer:");
        res.status(500).json({ message: "Failed to fetch offer" });
    }
}