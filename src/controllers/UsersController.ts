import { Request, Response } from 'express'
import { kcAdminClient } from 'index';
import { createUsersIfNotExists } from 'services/UserServices';


function mergeArrays(array1, array2) {
    const uuidMap = array2.reduce((acc, obj) => {
      acc[obj.uuid] = obj.id;
      return acc;
    }, {});
    
    const mergedArray = array1.map(obj => ({
        name:`${obj.firstName} ${obj.lastName}`,
        id: uuidMap[obj.id] 
    }));
    return mergedArray;
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
const getControllerGestion = async (req: Request, res: Response) => {
    try {
    const users = await kcAdminClient.roles.findUsersWithRole({
      name: "manager-controller",
    });
    const usersCreated = await createUsersIfNotExists(users)
    const usersObject = mergeArrays(users, usersCreated)
   return usersObject
    } catch (error) {
        throw error
        
    }
  }
export {getAllAssistants, getControllerGestion}