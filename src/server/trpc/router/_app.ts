// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { weatherRouter } from "./weather";
import { todoListsRouter } from "./todoList";
import { todoItemRouter } from "./todoItem";

export const appRouter = router({
  weather: weatherRouter,
  auth: authRouter,
  todoLists: todoListsRouter,
  todoItems: todoItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
