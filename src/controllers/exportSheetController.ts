import { Request, Response } from 'express'
import { SheetRow } from 'types/SheetRow';
import { prisma } from '../index';

export const exportSheet = async (req: Request, res: Response) => {

    const { data } = req.body

    const dataParse = JSON.parse(data);

    dataParse.forEach(async (row: SheetRow) => {
      const existingSheetRow = await prisma.sheetRow.findFirst({
        where: {
          promo: row.promo,
          course: row.course
        }
      });

        if (existingSheetRow) {
            await prisma.sheetRow.update({
            where: {
                id: existingSheetRow.id
            },
            data: {
                listOfDate: row.listOfDate
            }
            });
        } else {
            await prisma.sheetRow.create({
            data: {
                promo: row.promo,
                course: row.course,
                listOfDate: row.listOfDate
            }
            });
        }
    });

    res.status(200).json({ message: 'Export terminé !' })
}

