import { Request, Response } from "express";
import { createDocument, readDocument } from "@/services/DocumentService";
import { CreateDocumentBody } from "@/dto/documentDto";
import path from "path";
import fs from "fs";
import { createBill, readBill } from "@/services/BillService";

export async function uploadBillHandler(
    req: Request,
    res: Response
  ) {
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    const filePath = path.join(file.path);
  
    const newResume = await createBill({
      file: filePath,
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