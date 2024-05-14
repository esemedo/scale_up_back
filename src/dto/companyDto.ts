import { z } from "zod";

export const readCompanyParamsSchema = z.object({
  id: z.coerce.number(),
});

export type ReadCompanyParams = z.infer<typeof readCompanyParamsSchema>;
