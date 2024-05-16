import { z } from "zod";

export const createDocumentBodySchema = z
  .object({
    userId: z.string().refine((val) => !isNaN(Number(val)), {
      message: "userId must be a number",
    }),
    contributorId: z
      .string()
      .optional()
      .refine((val) => !isNaN(Number(val)), {
        message: "contributorId must be a number",
      }),
    type: z.enum([
      "Resume",
      "Diploma",
      "CriminalRecord",
      "KBIS",
      "URSSAFCertificate",
      "TaxCertificate",
    ]),
    issueDate: z.string().date().optional(),
    year: z
      .string()
      .optional()
      .refine((val) => !isNaN(Number(val)), {
        message: "year must be a number",
      }),
  })
  .refine(
    (data) => {
      if (
        [
          "CriminalRecord",
          "KBIS",
          "URSSAFCertificate",
          "TaxCertificate",
        ].includes(data.type)
      ) {
        return data.issueDate !== undefined;
      }
      return true;
    },
    {
      message: "issueDate is required for the selected type",
      path: ["issueDate"],
    }
  );

export type CreateDocumentBody = z.infer<typeof createDocumentBodySchema>;

export const readDocumentsQuerySchema = z.object({
  year: z.coerce.number().optional(),
  type: z
    .enum([
      "Resume",
      "Diploma",
      "CriminalRecord",
      "KBIS",
      "URSSAFCertificate",
      "TaxCertificate",
    ])
    .optional(),
});

export type ReadDocumentsQuery = z.infer<typeof readDocumentsQuerySchema>;
