import { IParams } from "../utils/params";
import { z } from "zod";

export const readCompanyParamsSchema = z.object({
  id: z.coerce.number(),
});

export type ReadCompanyParams = IParams<
  z.infer<typeof readCompanyParamsSchema>
>;
