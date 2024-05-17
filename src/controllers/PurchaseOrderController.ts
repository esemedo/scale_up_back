import { Request, Response } from 'express'
import { prisma } from '../index'
import path from 'path'
import { existsSync } from 'fs'

export const getPurchaseOrders = async (req: Request, res: Response) => {
    let purchaseOrders = await prisma.purchaseOrder.findMany().catch((error) => {
        console.error('Error fetching purchaseOrders:', error)
        res.status(500).json({ error: 'Error fetching purchaseOrders' })
    })
    res.status(200).json(purchaseOrders)
}


export const getFilesPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const fileRecord = await prisma.purchaseOrder.findUnique({
          where: { id: parseInt(id) },
        });
    
        if (!fileRecord) {
          return res.status(404).send('Fichier introuvable !');
        }
    
        const filePath = path.resolve(`./files/purchaseOrder/${fileRecord.fileUrl}`);
        
        if (!existsSync(filePath)) {
          return res.status(404).send('Fichier introuvable sur le serveur!');
        }
    
        res.sendFile(filePath);
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
    }