// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { weatherRouter } from "./weather";

export const appRouter = router({
  example: exampleRouter,
  weather: weatherRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
