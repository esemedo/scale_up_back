import { Request, Response } from "express";
import { kcAdminClient, prisma } from 'index';

export const getCompany = async (req: Request, res: Response) => {
  // const users = await kcAdminClient.roles.findUsersWithRole({
  //   name: "speaker-company",
  // });
  // const validUsers = users.filter((user) => user.enabled === true);
  // const validUserUiids = validUsers.map((user) => user.id);
  // const validUserIds = validUserUiids.map((uuid) => uuid.split("-")[0]);
  // const companyData = await prisma.company.findMany({
  //   where: {
  //     userId: {
  //       in: validUserIds,
  //     },
  //   },
  // });
  const company = await prisma.company.findMany({
    select: {
      name: true,
      mail: true,
      phone: true,
    }
  })
  
  res.status(200).json(company)

}