import { kcAdminClient, prisma } from "index";
import { mergeArrays } from "../utils/mergeArrays";

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


export async function getUserById(idUser){
  return await prisma.user.findUnique({
    where: {id:idUser}
  })
} 
export async function getInfoUserByUuid(uuid){
  return await kcAdminClient.users.findOne({id:uuid})  
 
  }

export const getControllerGestion = async () => {
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