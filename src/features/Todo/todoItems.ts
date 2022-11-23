import { PriorityLevel } from "@prisma/client";
import { match } from "ts-pattern";
import { z } from "zod";
import dayjs from "dayjs";

export const createTodoItemSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }).max(255),
  notes: z.string().optional().nullable(),
  todoListId: z.bigint(),
});

export const updateTodoItemSchema = z.object({
  id: z.bigint(),
  title: z.string().min(3, { message: "Title is required" }).max(255),
  notes: z.string().optional().nullable(),
});

/* Demonstrate encapsulating business logic in a pure function.
  This function is however pragmatic we dont take in the entire todoItem
  or return the whole todo item as the update only requires the data provided and returned.
  
  This function also shows off the amazing ts-pattern library which is a great way to handle pattern matching in typescript.
  We then use dayjs to handle date manipulation its not got a pure functional api for date but its a super tiny library and I
  think most developers find it more intuitive than than date-fns.
  */
export const updatePriorityLevelHandler = (
  priorityLevel: PriorityLevel,
  currentDate: Date
) => {
  return match(priorityLevel)
    .with(PriorityLevel.High, () => ({
      priorityLevel,
      dueDate: dayjs(currentDate).add(1, "day").toDate(),
    }))
    .with(PriorityLevel.Medium, () => ({
      priorityLevel,
      dueDate: dayjs(currentDate).add(1, "week").toDate(),
    }))
    .with(PriorityLevel.Low, () => ({
      priorityLevel,
      dueDate: dayjs(currentDate).add(2, "weeks").toDate(),
    }))
    .exhaustive();
};
