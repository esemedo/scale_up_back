import { NextFunction, Request, Response } from "express";
import { prisma } from "../index";
export const createUserIfNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.kauth.grant) {
      next();
      return;
    }
    const userUUID = req.kauth.grant.access_token.content.sub;

    const user = await prisma.user.upsert({
      where: {
        uuid: userUUID,
      },
      update: {},
      create: {
        uuid: userUUID,
      },
    });

    req.userId = user.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
