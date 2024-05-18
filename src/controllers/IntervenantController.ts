import { Request, Response } from "express";
import { kcAdminClient, prisma } from 'index';

export const getCompany = async (req: Request, res: Response) => {
  const company = await prisma.company.findMany({
    select: {
      name: true,
      mail: true,
      phone: true,
    }
  })
  
  res.status(200).json(company)

}