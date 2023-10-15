import * as z from "zod";

export const searchParamsSchema = z.object({
  type: z.enum(["person", "animal"]).default("person").optional(),
  query: z.string().optional(),
});
