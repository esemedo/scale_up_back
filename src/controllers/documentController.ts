import { Request, Response } from "express";
import { createDocument, readDocument } from "../services/DocumentService";
import { CreateDocumentBody } from "../dto/documentDto";
import path from "path";
import fs from "fs";

export async function uploadDocumentHandler(
  req: Request<any, any, CreateDocumentBody>,
  res: Response
) {
  const values = req.body;
  const userId = Number(req.body.userId);
  const contributorId = Number(req.body.contributorId);

  const year = Number(req.body.year);
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join(file.path);
  const fileName = path.parse(file.originalname).name;

  const newResume = await createDocument({
    ...values,
    userId,
    contributorId,
    fileName,
    year,
    path: filePath,
  });

  res.json(newResume);
}

export async function downloadDocumentHandler(req: Request, res: Response) {
  const { id } = req.params;

  const document = await readDocument(Number(id));

  if (!document) {
    return res.status(404).json({ message: "Document not found" });
  }

  const filePath = path.join(document.path);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(document.path);
}
