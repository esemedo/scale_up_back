import { Request, Response } from "express";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { prisma } from "../index";

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
    pdfDoc.getBuffer((buffer) => {
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
    pdfDoc.getBuffer((buffer) => {
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
