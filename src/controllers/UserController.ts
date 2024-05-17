import { Request, Response } from 'express'
import { prisma } from '../index'
import { kcAdminClient } from 'index';
import { log } from 'console';

export const getUsers = async (req: Request, res: Response) => {
    let users = await prisma.user.findMany().catch((error) => {
        console.error('Error fetching users:', error)
        res.status(500).json({ error: 'Error fetching users' })
    })
    res.status(200).json(users)
}


export async function createUsersIfNotExists(usersData) {
    const promises = usersData.map(async (userData) => {
        const existingUser = await prisma.user.findFirst({
          where: {
            uuid: userData.id 
          }
        });
        if (!existingUser) {
          return prisma.user.create({
            data: {
              uuid: userData.id   
            },
          });
        } else {
          return existingUser;
        }
      });
    const users = await Promise.all(promises);
    return users;
}


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


  export const getAllAssistants = async (req: Request, res: Response) => {
    try {
        const users = await kcAdminClient.roles.findUsersWithRole({
        name: "educational-assistant",
        });

        if (!users) {
          return res.status(400).json([])    
        }

      
        const usersCreated = await createUsersIfNotExists(users)
        const usersObject = mergeArrays(users, usersCreated)
        res.status(200).json(usersObject)
  } catch (error) {
      res.status(500).json({ error: 'Can\'t get all assistants' });
      console.log(error);
      
        
    }
}