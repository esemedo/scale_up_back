import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllDEI = async (req: Request, res: Response) => {
    try {
      //temporaire
      req.userId = 1
      const {priority } = req.query
      let whereClause ={ AND:[{"sashaStatus":{not:1}}, {need: {
            promotion:{
              users:{
                some: {
                  userId: req.userId
                }
              }
            }
          } 
        }]
      }
      const parsedPriority = parseInt(String(priority))
      if (priority && !isNaN(parsedPriority)){
        whereClause["priority"] = parsedPriority
      }
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
    const ID_CONTROLEUR = 2
      const {id} = req.params
      const {sachaStatus} = req.body
      let data = {
        sashaStatus: sachaStatus
      }
      await prisma.dei.update({
          where: {
            id: parseInt(id),
          },
          data ,
        })
        
        
      if(sachaStatus ===1){
          await prisma.notification.create({
            data: {
              userId: ID_CONTROLEUR,
              title: "Demande d'achat saisi sur SACHA", 
              text: "La demande a été saisi sur SACHA. Veuillez associé le bon de commande.",
              category:1,
              status:0,
              dueDate: new Date()
            },
          })
      return res.json({message: "Tâche envoyé au controleur de gestion !"});

      }
      res.json({message: "Statut SACHA mis à jour !"});

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