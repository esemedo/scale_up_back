import { Request, Response } from "express";
import { kcAdminClient } from "index";
import { prisma } from "../index";
import { createUsersIfNotExists } from "../services/UserServices";
import { mergeArrays } from "../utils/mergeArrays";

export const getUsers = async (req: Request, res: Response) => {
  try {
    let users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Error fetching users" });
  }
};


export const getAllAssistants = async (req: Request, res: Response) => {
  try {
    const users = await kcAdminClient.roles.findUsersWithRole({
      name: "educational-assistant",
    });

    if (!users) {
      return res.status(400).json([]);
    }

    const usersCreated = await createUsersIfNotExists(users);
    const usersObject = mergeArrays(users, usersCreated);
    res.status(200).json(usersObject);
  } catch (error) {
    res.status(500).json({ error: "Can't get all assistants" });
  }
};
