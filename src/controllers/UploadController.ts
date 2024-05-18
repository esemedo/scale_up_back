import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import fs from "fs";

const prisma = new PrismaClient();

let billPath = "";

interface Syllabus {
  subjectId: number;
  authorId: number;
  offerId: number;
  fileName: string;
  file: object;
  path: string;
  createdAt: Date;
  user: User;
}

interface Bill {
  fileName: string;
  file: object;
  status: number;
  validity: false;
}

export const uploadBill = async (req: Request, res: Response) => {
  console.log("here");
  const d: Bill = req.body;
  if (billPath != "") {
    const bill = await prisma.bill.create({
      data: {
        file: billPath,
        status: 0,
        validity: false,
      },
    });
    res.status(200).json(bill);
  } else {
    res.status(500).send("Path not found");
  }
};

export const uploadBillFile = async (req: Request, res: Response) => {
  console.log("uploading billpath");
  billPath = req.file!.path;
  res.status(200).send("ok");
};

export const uploadSyllabus = async (req: Request, res: Response) => {
  try {
    const d: Syllabus = req.body;
    const syllabus = await prisma.syllabus.create({
      data: {
        subjectId: d.subjectId,
        authorId: d.authorId,
        offerId: d.offerId,
        file: d.path,
        createdAt: d.createdAt,
      },
    });
    res.status(200).json(syllabus);
  } catch {
    res.status(500).send("error occurred");
  }
};

export const uploadSyllabusFile = async (req: Request, res: Response) => {
  const syllabusPath = req.file!.path;
  res.status(200).send({ path: syllabusPath });
};

export const uploadPTF = async (req: Request, res: Response) => {
  const ptfPath = req.file!.path;
  const offerID = req.body.offerID;

  await prisma.offer.update({
    where: {
      id: parseInt(offerID),
    },
    data: {
      ptf: ptfPath,
    },
  });
  res.status(200).send("ok");
};

export const getPTF = async (req: Request, res: Response) => {
  const offerID = req.url.split("offerID=", 2)[1];
  const offer = await prisma.offer.findUnique({
    where: {
      id: parseInt(offerID),
    },
  });

  if (!offer) {
    res.status(404).send("Offer not found");
    return;
  }
  res.download(offer.ptf);
};

export const getSyllabus = async (req: Request, res: Response) => {
  const subjectID = req.url.split("subjectID=", 2)[1];
  const subject = await prisma.subject.findUnique({
    where: {
      id: parseInt(subjectID),
    },
    select: {
      syllabus: true,
    },
  });

  if (!subject) {
    res.status(404).send("Subject not found");
    return;
  }
  res.download(subject.syllabus[0].file);
};

export const getTemplatePTF = async (req: Request, res: Response) => {
  const offer = await prisma.offer.findUnique({
    where: {
      id: 1,
    },
  });

  if (!offer) {
    res.status(404).send("Offer not found");
    return;
  }
  res.download(offer.ptf);
};

export const getTemplateSyllabus = async (req: Request, res: Response) => {
  const subject = await prisma.subject.findUnique({
    where: {
      id: 1,
    },
    select: {
      syllabus: true,
    },
  });

  if (!subject) {
    res.status(404).send("Subject not found");
    return;
  }
  res.download(subject.syllabus[0].file);
};

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const needId = req.url.split("needId=", 2)[1];
    console.log(needId);
    const result = await prisma.subject.findMany({
      select: {
        _count: {
          select: {
            needs: { where: { id: parseInt(needId) } },
          },
        },
        id: true,
        name: true,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const getOffers = async (req: Request, res: Response) => {
  try {
    const userID = req.url.split("userID=", 2)[1];
    const result = await prisma.user.findUnique({
      where: {
        uuid: userID,
      },
      select: {
        offers: true,
      },
    });

    if (!result) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json(result.offers);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const getNeed = async (req: Request, res: Response) => {
  try {
    const result = await prisma.need.findUnique({
      where: {
        id: req.body.needId,
      },
      select: {
        id: true,
        subject: true,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const generatePDF = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);
    const doc = new PDFDocument();

    doc.pipe(
      fs.createWriteStream(
        `uploads/${body.name}-${body.surname}-trainingrep.pdf`
      )
    );

    doc.fontSize(27).text(body.name, 100, 100);
    doc.fontSize(27).text(body.surname, 100, 150);
    doc.fontSize(27).text(body.email, 100, 200);
    doc.fontSize(27).text(body.phone, 100, 250);
    doc
      .fontSize(27)
      .text(
        "Comment avez-vous trouvé le contenu de la formation par rapport à vos besoins ?",
        50,
        350
      );
    doc.fontSize(27).text(body.answer, 35, 450);

    doc.end();
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const downloadPDF = async (req: Request, res: Response) => {
  try {
    const params = req.url.split("?name=", 2)[1];
    const name = params.split("&surname=", 2)[0];
    const surname = params.split("&surname=", 2)[1];
    console.log(name);
    console.log(surname);
    res.download(`uploads/${name}-${surname}-trainingrep.pdf`);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const getBills = async (req: Request, res: Response) => {
  try {
    const result = await prisma.bill.findMany({
      where: {
        id: req.body.billId,
      },
      select: {
        id: true,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
