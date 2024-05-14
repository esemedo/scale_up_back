import { Request, Response } from 'express';
import { createAbsenceWithSubstitute, getAbsencesOfUser, updateSubstitute } from '../services/AbsenceService';

async function createAbsence(req: Request, res: Response) {
    const { startDate, endDate, reason, substitutUserId } = req.body;
    try {
     await createAbsenceWithSubstitute(req.userId, startDate, endDate, reason, substitutUserId)
      res.status(201).json({message: "Absence created !"});
    } catch (error) {
      res.status(500).json({ error: 'Unable to create absence' });
    }
  }

async function updateSubstituteAbsence(req: Request, res: Response) {
    try {
      const { substitutUserId } = req.body;
      const {id} = req.params
      const parsedId = parseInt(id)
      
      await updateSubstitute(parsedId,substitutUserId)
      res.status(200).json({message: "Absence updated !"});
    } catch (error) {
      res.status(500).json({ error: 'Unable to update absence' });
    }
  }
async function getAbsences(req: Request, res: Response) {
    try {
      const absence =await getAbsencesOfUser(req.userId)
      res.status(201).json(absence);
    } catch (error) {
      res.status(500).json({ error: 'Can\'t get all absence' });
    }
  }

// const getAllAssistant = async (req: Request, res: Response) => {
//   const users = await kcAdminClient.roles.findUsersWithRole({
//     name: "educational-assistant",
//   });
//   res.status(200).json(users)
// }
// const getControllerGestion = async (req: Request, res: Response) => {
//   const users = await kcAdminClient.roles.findUsersWithRole({
//     name: "educational-assistant",
//   });
//   res.status(200).json(users)
// }
export {createAbsence, getAbsences, updateSubstituteAbsence}