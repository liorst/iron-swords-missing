import { peopleRouter } from "@/server/api/routers/people";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  people: peopleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
