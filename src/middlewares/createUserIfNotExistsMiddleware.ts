import { Request, Response, NextFunction } from "express";
import { prisma } from "../index";
export const createUserIfNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!(req as any).kauth!.grant) {
      next();
      return;
    }
    const userUUID = (req as any).kauth!.grant.access_token!.content!.sub;

    const user = await prisma.user.upsert({
      where: {
        uuid: userUUID,
      },
      update: {},
      create: {
        uuid: userUUID,
      },
    });

    (req as any).userId = user.id;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
