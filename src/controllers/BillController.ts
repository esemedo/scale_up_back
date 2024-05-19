import { Request, Response } from "express";
import { createDocument, readDocument } from "../services/DocumentService";
import { CreateDocumentBody } from "../dto/documentDto";
import path from "path";
import fs from "fs";
import { createBill, readBill } from "../services/BillService";

import { prisma } from "../index";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export async function uploadBillHandler(req: Request, res: Response) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join(file.path);

  const newResume = await createBill({
    total: 0,
    status: 0,
    validity: false,
  });

  res.json(newResume);
}

export async function downloadBillHandler(req: Request, res: Response) {
  const { id } = req.params;

  const bill = await readBill(Number(id));

  if (!bill) {
    return res.status(404).json({ message: "Bill not found" });
  }

  const filePath = path.join(bill.file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(bill.file);
}

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const getBills = async (req: Request, res: Response) => {
  try {
    let bills = await prisma.bill.findMany();
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ error: "Error fetching bills" });
  }
};

export const validateBill = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedBill = await prisma.bill.update({
      where: { id: parseInt(id) },
      data: { status: 1, validity: true },
    });
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error("Error validating bill:", error);
    res.status(500).json({ error: "Error validating bill" });
  }
};

export const cancelBill = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedBill = await prisma.bill.update({
      where: { id: parseInt(id) },
      data: { status: 2, validity: false },
    });
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error("Error cancelling bill:", error);
    res.status(500).json({ error: "Error cancelling bill" });
  }
};

export const downloadBill = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const bill = await prisma.bill.findUnique({
      where: { id: parseInt(id) },
      include: {
        contract: true,
        quotation: true,
      },
    });

    if (!bill) {
      res.status(404).json({ error: "Bill not found" });
      return;
    }

    const docDefinition = {
      content: [
        { text: `Facture n°: ${bill.id}`, style: "header" },
        { text: `Total: ${bill.total}` },
        { text: `Status: ${bill.status}` },
        { text: `Validity: ${bill.validity}` },
        { text: `Contract ID: ${bill.contractId}` },
        { text: `Quotation ID: ${bill.quotationId}` },
      ],
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBuffer((buffer: any) => {
      const fileName = `bill_${bill.id}.pdf`;
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-Type", "application/pdf");
      res.send(Buffer.from(buffer));
    });
  } catch (error) {
    console.error("Error downloading bill:", error);
    res.status(500).json({ error: "Error downloading bill" });
  }
};

export const viewBill = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const bill = await prisma.bill.findUnique({
      where: { id: parseInt(id) },
      include: {
        contract: true,
        quotation: true,
      },
    });

    if (!bill) {
      res.status(404).json({ error: "Bill not found" });
      return;
    }

    const docDefinition = {
      content: [
        { text: `Facture n°: ${bill.id}`, style: "header" },
        { text: `Total: ${bill.total}` },
        { text: `Status: ${bill.status}` },
        { text: `Validity: ${bill.validity}` },
        { text: `Contract ID: ${bill.contractId}` },
        { text: `Quotation ID: ${bill.quotationId}` },
      ],
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBuffer((buffer: any) => {
      const fileName = `bill_${bill.id}.pdf`;
      res.setHeader("Content-Disposition", `inline; filename=${fileName}`);
      res.setHeader("Content-Type", "application/pdf");
      res.send(Buffer.from(buffer));
    });
  } catch (error) {
    console.error("Error downloading bill:", error);
    res.status(500).json({ error: "Error downloading bill" });
  }
};
