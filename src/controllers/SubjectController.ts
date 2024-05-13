import { Request, Response } from 'express'
import { prisma } from '../index'

export const getSubjects = async (req: Request, res: Response) => {
    let subjects = await prisma.subject.findMany().catch((error) => {
        console.error('Error fetching subjects:', error)
        res.status(500).json({ error: 'Error fetching subjects' })
    })
    res.status(200).json(subjects)
}

export const getSubjectsByCategory = async (req: Request, res: Response) => {
    let categoryId = parseInt(req.params.categoryId)
    let subjects = await prisma.subject.findMany({
        where: {
            categoryId: categoryId
        },
        select: {
            name: true
        }
    }).catch((error) => {
        console.error('Error fetching subjects:', error)
        res.status(500).json({ error: 'Error fetching subjects' })
    })
    res.status(200).json(subjects)
}

// export const addSubjectToPromotion = async (req: Request, res: Response) => {
//     const { subjectId, promotionId } = req.body;

//     if (!subjectId || !promotionId) {
//         return res.status(400).json({ error: 'Subject ID and Promotion ID are required.' });
//     }

//     try {
//         const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
//         const promotion = await prisma.promotion.findUnique({ where: { id: promotionId } });

//         if (!subject || !promotion) {
//             return res.status(404).json({ error: 'Subject or Promotion not found.' });
//         }

//         await prisma.promotionSubject.create({
//             data: {
//                 promotionId: promotionId,
//                 subjectId: subjectId
//             }
//         });

//         res.status(200).json({ message: 'Subject successfully added to the promotion.' });
//     } catch (error) {
//         console.error('Error adding subject to promotion:', error);
//         res.status(500).json({ error: 'Error adding subject to promotion.' });
//     }
// };