import { z } from "zod";

export const createTodoItemSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }).max(255),
  notes: z.string().optional().nullable(),
  todoListId: z.bigint(),
});
