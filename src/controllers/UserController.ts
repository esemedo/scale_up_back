import { Request, Response } from "express";
import { kcAdminClient, prisma} from "index";
import { body, matchedData, validationResult } from 'express-validator'
import { SPEAKER_COMPANY_ROLE } from '../utils/userConst'


export const getUsers = async (req: Request, res: Response) => {
  try {
    let users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Error fetching users" });
  }
};

export async function createUsersIfNotExists(usersData) {
  try {
    const promises = usersData.map(async (userData) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          uuid: userData.id,
        },
      });
      if (!existingUser) {
        return prisma.user.create({
          data: {
            uuid: userData.id,
          },
        });
      } else {
        return existingUser;
      }
    });
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error("Error creating users:", error);
    return [];
  }
}

function mergeArrays(array1, array2) {
  const uuidMap = array2.reduce((acc, obj) => {
    acc[obj.uuid] = obj.id;
    return acc;
  }, {});

  const mergedArray = array1.map((obj) => ({
    name: `${obj.firstName} ${obj.lastName}`,
    id: uuidMap[obj.id],
  }));
  return mergedArray;
}

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
    console.log(error);
  }
};


export const registerUser = async (req: Request, res: Response) => {
    const { role, email } = matchedData(req)
    // if role is not speaker-company email must end with @edu.essie-it.com
    if (email && role && role !== SPEAKER_COMPANY_ROLE)
        await body('email')
            .custom(async (value) => {
                if (!value.endsWith('@edu.esiee-it.fr')) {
                    throw new Error('Email must end with @edu.esiee-it.fr')
                }
            })
            .run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // register user
        const { id: kId } = await kcAdminClient.users.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            enabled: role === SPEAKER_COMPANY_ROLE,
            attributes: {
                phone: req.body.phone
            },
            credentials: [
                {
                    type: 'password',
                    value: req.body.password
                }
            ],
            emailVerified: false
        })
        // get realm role id
        const { id: roleId } = await kcAdminClient.roles.findOneByName({
            name: req.body.role
        })
        // set realm role
        await kcAdminClient.users.addRealmRoleMappings({
            id: kId,
            roles: [{ id: roleId, name: req.body.role }]
        })
        res.status(201).json({ id: kId })
    } catch (error) {
        console.error(error)
        if (error.response?.status === 409) return res.status(409).json({ error: 'Email already exists' })
        return res.status(400).json({ error: 'An error occurred while registering user' })
    }
}
