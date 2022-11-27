import { match } from "ts-pattern";
import { z } from "zod";
import dayjs from "dayjs";
import { Result } from "@features/common/result";

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

export const PriorityLevel = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
} as const;

export type PriorityLevel = typeof PriorityLevel[keyof typeof PriorityLevel];

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

export const scheduleDueDateHandler = (
  scheduledItems: { id: bigint; dueDate: Date | null }[],
  itemToScheduleId: bigint,
  dueDate: Date
): Result<{ itemToScheduleId: bigint; dueDate: Date }> => {
  /* 
  This is a contrived example where we are not allowed to schedule multiple tasks to be due on the same hour. 
  We would probably never do this but it demonstrates functional business logic acting on a set of domain items and 
  passing back a result object 
  */
  const canSchedule = scheduledItems.every((item) => {
    const diff = dayjs(item.dueDate).diff(dueDate, "day");
    diff;
    return diff !== 0;
  });

  if (canSchedule) {
    return Result.success({ itemToScheduleId, dueDate });
  }
  return Result.failed(
    "Can't schedule multiple items to be due on the same day"
  );
};
