import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createNotif } from "../services/NotificationService";
import { getControllerGestion } from "./UserController";
import { createPurchaseOrderAndUpdateDei } from "services/DeiServices";
import { getInfoUserByUuid, getUserById } from "services/UserServices";
import { sendEmailUtils } from "utils/sendEmail";
import {PurchaseOrderEmail} from "../../emails/templateMailPurchaseOrder"
const prisma = new PrismaClient();

const getAllDEI = async (req: Request, res: Response) => {
    try {
      const {priority, status } = req.query
      let currentDate = new Date()
      let whereClauseMain ={ AND:[{"sashaStatus":status}, {need: {
            promotion:{
              assistantId:req.userId
            }
          } 
        }]
      }
      let whereClauseSubstitut ={ AND:[{"sashaStatus":status},{
        need: {
          promotion: {
            assistant:{
              absences: {
                some: {
                  startDate: { lte: currentDate },
                  endDate: { gte: currentDate },
                  substituteUserId: req.userId,
                },
            },
          }
          },
        },
      },]
  }
      const parsedPriority = parseInt(String(priority))
      if (priority && !isNaN(parsedPriority)){
        whereClauseSubstitut["priority"] = parsedPriority
        whereClauseMain["priority"] = parsedPriority
      }
        const mainTasks = await prisma.dei.findMany({
          where: whereClauseMain, orderBy:[{dueDate: "asc"}],
          include:{purchaseOrder: true}
        });
      
        const substituteTasks = await prisma.dei.findMany({
          where: whereClauseSubstitut, orderBy:[{dueDate: "asc"}],
          include:{purchaseOrder: true}
        });
      
        const allTasks = [...mainTasks, ...substituteTasks];
        res.json(allTasks);
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
              id: id,
            },
            data: {
              status: status,
            },
          })
          
        res.json({message: "Task updated !"});

    } catch (error) {
        res.status(500).json({ error: 'Could not update DEI status ' });
    }
};

const updateDei = async (req: Request, res: Response) => {
  try {
      const {id} = req.params
      const {sashaStatus, priority} = req.body
      let data = {}
      if(sashaStatus) data['sashaStatus'] = parseInt(sashaStatus)
      if(priority) data['priority'] = parseInt(priority)
      
      if(parseInt(sashaStatus) === 3 && req.file){
          const {updatedDei} = await createPurchaseOrderAndUpdateDei(id, req.file.filename,data )
          const idIntervenant = updatedDei?.contract?.signatoryId
          if (!idIntervenant) return res.status(400).json({message: 'Il y a un problème avec la tâche.'})
          await createNotif({
              userId: idIntervenant,
              title: "Bon de commande retourné", 
              text: "Vous pouvez dès à présent consulter votre bon de commande. Le lien vous a été envoyé par mail.",
              category:1, 
              status:updatedDei.status,
              dueDate: updatedDei?.dueDate
            });
          const user = await getUserById(idIntervenant)
          const email = (await getInfoUserByUuid(user.uuid)).email
          
          if(email){
            sendEmailUtils(email, "Bon de commande retourné", PurchaseOrderEmail({ idDei: updatedDei
              .id
            }))
          }
          return res.json({message: "Bon de commande retourné !"});
      }
      const updated = await prisma.dei.update({
          where: {
            id: id,
          },
          data ,
        })
      if(sashaStatus ===1){
        const controller = await getControllerGestion()
        await Promise.all( controller.map(async user => {
          await createNotif({
            userId: user.id,
            title: "Demande d'achat saisi sur SACHA", 
            text: "La demande a été saisi sur SACHA. Vous pouvez maintenant créer le bon de commande sur SACHA.",
            category:1, 
            status:0,
            dueDate: updated.dueDate
          });
        }))
      return res.json({message: "Tâche envoyé au controleur de gestion !"});
      }
      res.json({message: "Statut SACHA mis à jour !"});
  } catch (error) {
      res.status(500).json({ error: 'Could not update SACHA status ' });
  }
};




export { getAllDEI, updateDei, updateStatusDEI};
