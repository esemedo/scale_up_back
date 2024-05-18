import { IParams } from "../utils/params";
import { z } from "zod";

export const createExemptionBodySchema = z.object({
  contributorId: z.number({
    required_error: "Contributor ID is required",
  }),
  subjectId: z.number({
    required_error: "Subject ID is required",
  }),
  hourlyRate: z.number({
    required_error: "Hourly rate is required",
  }),
  reason: z.string({
    required_error: "Reason is required",
  }),
});

export type CreateExemptionBody = z.infer<typeof createExemptionBodySchema>;

export const readExemptionsQuerySchema = z.object({
  status: z
    .enum(["pending", "approved", "rejected"], {
      message: "Status must be one of 'pending', 'approved', or 'rejected'",
    })
    .optional(),
});

export type ReadExemptionsQuery = z.infer<typeof readExemptionsQuerySchema>;

export const updateExemptionParamsSchema = z.object({
  id: z.coerce.number(),
});

export const updateExemptionQuerySchema = z.object({
  action: z.enum(["approve", "reject"], {
    required_error: "Action is required",
    message: "Invalid action",
  }),
});

export type UpdateExemptionQuery = z.infer<typeof updateExemptionQuerySchema>;

export type UpdateExemptionParams = IParams<
  z.infer<typeof updateExemptionParamsSchema>
>;
