import { Request, Response } from "express";
import { sendEmailUtils } from "../utils/sendEmail";
import StackOverflowTipsEmail from "../../emails/templateExemple"
export const getHello = (req: Request, res: Response) => {
  sendEmailUtils("matheoprofessionnel12@gmail.com", "Test subject final", StackOverflowTipsEmail({}));
  res.status(200).json({ message: "Hello World!" });

};
