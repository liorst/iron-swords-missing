import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { fetchDbData } from "@/services/fetch-db-data";

export const peopleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      const { query } = input;
      return fetchDbData({ name: query });
    }),
});
