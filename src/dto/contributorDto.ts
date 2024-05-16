import { IParams } from "@/utils/params";
import { z } from "zod";

export const createContributorBodySchema = z.object({
  companyId: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  image: z.string().optional(),
});

export type CreateContributorBody = z.infer<typeof createContributorBodySchema>;

export const readContributorParamsSchema = z.object({
  id: z.coerce.number(),
});

export type ReadContributorParams = IParams<
  z.infer<typeof readContributorParamsSchema>
>;

export const readContributorExemptionsParamsSchema =
  readContributorParamsSchema.extend({
    subjectId: z.coerce.number(),
  });

export type ReadContributorExemptionsParams = IParams<
  z.infer<typeof readContributorExemptionsParamsSchema>
>;
