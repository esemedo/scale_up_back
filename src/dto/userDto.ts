import { IParams } from "@/utils/params";
import { z } from "zod";

export const readUserParamsSchema = z.object({
  id: z.coerce.number(),
});

export type ReadUserParams = IParams<z.infer<typeof readUserParamsSchema>>;
