import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express'

const prisma = new PrismaClient();

let syllabusPath = '';
let billPath= '';

interface Syllabus {
    subjectId: number,
    authorId: number,
    offerId: number,
    fileName: string,
    file: object,
    createdAt: Date,
    user: User
}

interface Bill{
    contractId:  number;
    quotationId: number;
    total:       number;
    fileName:    string;
    file:        object;
    status:      number;
    validity:    false;
}

interface MulterRequest extends Request {
    file: {
        path: string
    },
    body: {
        offerID: string
    }
}

export const uploadBill = async (req: Request, res: Response) => {
    console.log('here')
    const d: Bill = req.body
    if(billPath != '') {
        const bill = await prisma.bill.create({
            data: {
                contractId: d.contractId,
                quotationId: d.quotationId,
                total: d.total,
                file: billPath,
                status: d.status,
                validity: false
            }
        })
        res.status(200).json(bill)
    } else {
        res.status(500).send('Path not found');
    }
}

export const uploadBillFile = async (req: Request, res: Response) => {
    console.log('uploading billpath')
    billPath = (req as MulterRequest).file.path
    res.status(200).send('ok')
}

export const uploadSyllabus = async (req: Request, res: Response) => {
    const d: Syllabus = req.body
    if(syllabusPath != '') {
        const syllabus = await prisma.syllabus.create({
            data: {
                subjectId: d.subjectId,
                authorId: d.authorId,
                offerId: d.offerId,
                file: syllabusPath,
                createdAt: d.createdAt,
            }
        })
        res.status(200).json(syllabus)
    } else {
        res.status(500).send('Path not found');
    }
}

export const uploadSyllabusFile = async (req: Request, res: Response) => {
    syllabusPath = (req as MulterRequest).file.path
    res.status(200).send('ok')
}

export const uploadPTF = async (req: Request, res: Response) => {
    const ptfPath = (req as MulterRequest).file.path
    const offerID = (req as MulterRequest).body.offerID

    await prisma.offer.update({
        where: {
          id: parseInt(offerID),
        },
        data: {
          ptf: ptfPath,
        },
      })
    res.status(200).send('ok')
}

export const getPTF = async (req: Request, res: Response) => {
    const offerID = req.url.split('offerID=', 2)[1];
    const offer = await prisma.offer.findUnique({
        where: {
          id: parseInt(offerID),
        }
      })
    res.download(offer.ptf);
}


export const getSyllabus = async (req: Request, res: Response) => {
    const subjectID = req.url.split('subjectID=', 2)[1];
    const subject = await prisma.subject.findUnique({
        where: {
           id: parseInt(subjectID)
        },
        select: {
            syllabus: true,
        }
      })
    res.download(subject.syllabus[0].file);
}

export const getTemplatePTF = async (req: Request, res: Response) => {
    const offer = await prisma.offer.findUnique({
        where: {
          id: 1,
        }
      })
    res.download(offer.ptf);
}

export const getTemplateSyllabus = async (req: Request, res: Response) => {
    const subject = await prisma.subject.findUnique({
        where: {
           id: 1
        },
        select: {
            syllabus: true,
        }
      })
    res.download(subject.syllabus[0].file);
}


export const getSubjects = async (req: Request, res: Response) => {
    try {
        const needId = req.url.split('needId=', 2)[1];
        console.log(needId)
        const result = await prisma.subject.findMany({
            select: {
                _count: {
                    select: {
                        needs: { where: { id: parseInt(needId) } }
                    }
                },
                id: true,
                name: true,
            }
        });
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
}


export const getOffers = async (req: Request, res: Response) => {
    try {
        const userID = req.url.split('userID=', 2)[1];
        const result = await prisma.user.findUnique({
            where: {
                uuid: userID
            },
            select: {
               offers: true
            }
        });
        res.status(200).json(result.offers);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
}


export const getNeed = async (req: Request, res: Response) => {
    try {
        const result = await prisma.need.findUnique({
            where: {
                id: req.body.needId
            },
            select: {
                id: true,
                idSubject: true
            }
        });
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
}

export const getBills = async (req: Request, res: Response) => {
    try {
        const result = await prisma.bill.findMany({
            where: {
                id: req.body.billId
            },
            select: {
                id: true,
            }
        });
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
}

