import { z } from "zod";

export const schema = z.object({
  title: z.string().min(3, { message: "Title is required" }).max(255),
  color: z
    .string({
      required_error: "Color is required",
    })
    .length(7, { message: "Must be a hex color" })
    .startsWith("#", { message: "Must be a hex color" }),
});

export const entity = z.object({
  id: z.bigint(),
});

export const updateTodoListSchema = z.intersection(schema, entity);
