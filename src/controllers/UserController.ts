import { Request, Response } from 'express'
import { kcAdminClient, prisma } from '../index'
import { createUsersIfNotExists } from '../services/UserServices'
import { mergeArrays } from '../utils/mergeArrays'

export const getUsers = async (req: Request, res: Response) => {
    let users = await prisma.user.findMany().catch((error) => {
        console.error('Error fetching users:', error)
        res.status(500).json({ error: 'Error fetching users' })
    })
    res.status(200).json(users)
}


const getAllAssistants = async (req: Request, res: Response) => {
    try {
        const users = await kcAdminClient.roles.findUsersWithRole({
        name: "educational-assistant",
        });
        
        const usersCreated = await createUsersIfNotExists(users)
        const usersObject = mergeArrays(users, usersCreated)
        res.status(200).json(usersObject)
  } catch (error) {
      res.status(500).json({ error: 'Can\'t get all assistants' });
        
    }
}
const getControllerGestion = async () => {
    try {
    const users = await kcAdminClient.roles.findUsersWithRole({
      name: "management-controller",
    });
    const usersCreated = await createUsersIfNotExists(users)
    const usersObject = mergeArrays(users, usersCreated)
   return usersObject
    } catch (error) {
        throw error
        
    }
  }
export {getAllAssistants, getControllerGestion}