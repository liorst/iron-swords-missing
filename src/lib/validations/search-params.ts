import * as z from "zod";

export const searchParamsSchema = z.object({
  type: z
    .enum(["person", "animal"])
    .catch("person")
    .default("person")
    .optional(),
  query: z.string().optional(),
});
