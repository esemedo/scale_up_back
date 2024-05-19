import { Request, Response } from 'express';
import { createAbsenceWithSubstitute, deleteAbsenceOfUser, getAbsencesOfUser, updateSubstitute } from '../services/AbsenceService';
import { createNotif } from '../services/NotificationService';

async function createAbsence(req: Request, res: Response) {
    const { startDate, endDate, reason, substitutUserId } = req.body;
    try {
     await createAbsenceWithSubstitute(req.userId, startDate, endDate, reason, substitutUserId)
     if(substitutUserId !== null || substitutUserId)
      await createNotif({
        userId: substitutUserId,
        title: "Remplacement", 
        text: `Vous avez été choisi comme remplaçant .`,
        category:2, 
        status:0,
        dueDate: new Date()
      });
      res.status(201).json({message: "Absence crée !"});
    } catch (error) {
      res.status(500).json({ error: 'Impossible de créer une absence.'  });
    }
  }

async function updateSubstituteAbsence(req: Request, res: Response) {
    try {
      const { substitutUserId } = req.body;
      const {id} = req.params
      const parsedId = parseInt(id)
      
      await updateSubstitute(parsedId,substitutUserId)
      await createNotif({
        userId: substitutUserId,
        title: "Remplacement", 
        text: "Vous avez été choisi comme remplaçant.",
        category:2, 
        status:0,
        dueDate: new Date()
      });
      res.status(200).json({message: "Absence mis à jour !"});
    } catch (error) {
      res.status(500).json({ error:'Impossible de mettre à jour l\'absence.'  });
    }
  }

async function deleteAbsence(req: Request, res: Response) {
    try {
      const {id} = req.params
      const parsedId = parseInt(id)
      
      await deleteAbsenceOfUser(parsedId)
      res.status(200).json({message: "Absence supprimée !"});
    } catch (error) {
      res.status(500).json({ error: 'Impossible de supprimer l\'absence.' });
    }
  }
async function getAbsences(req: Request, res: Response) {
    try {
      const absence =await getAbsencesOfUser(req.userId)
      res.status(201).json(absence);
    } catch (error) {
      res.status(500).json({ error: "Impossible de récupérer toutes les absences."  });
    }
  }



export {createAbsence, getAbsences, updateSubstituteAbsence, deleteAbsence}