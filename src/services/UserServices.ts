import { kcAdminClient, prisma } from "index";

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