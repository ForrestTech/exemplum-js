// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { weatherRouter } from "./weatherEndpoint";
import { todoListsRouter } from "./todoListEndpoint";
import { todoItemRouter } from "./todoItemEndpoint";

export const appRouter = router({
  weather: weatherRouter,
  auth: authRouter,
  todoLists: todoListsRouter,
  todoItems: todoItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
