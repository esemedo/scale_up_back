import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export  async function createUserByUuid(uuid: string) {
    const newUser = await prisma.user.create({
        data: {
            uuid: uuid
        }
    });
    return newUser;
}

export async function readUsers() {
    const users = await prisma.user.findMany();
    return users;
}