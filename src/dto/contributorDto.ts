import { z } from "zod";

export const readContributorParamsSchema = z.object({
  id: z.coerce.number(),
});

export type ReadContributorParams = z.infer<typeof readContributorParamsSchema>;

export const readContributorExemptionsParamsSchema = z.object({
  id: z.coerce.number(),
  subjectId: z.coerce.number(),
});

export type ReadContributorExemptionsParams = z.infer<
  typeof readContributorExemptionsParamsSchema
>;
