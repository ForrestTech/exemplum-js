// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { weatherRouter } from "./weather";
import { todoListsRouter } from "./todo-lists";
import { todoItemRouter } from "./todo-items";

export const appRouter = router({
  example: exampleRouter,
  weather: weatherRouter,
  auth: authRouter,
  todoLists: todoListsRouter,
  todoItems: todoItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
