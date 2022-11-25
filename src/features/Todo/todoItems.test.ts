import { PriorityLevel } from "@prisma/client";
import dayjs from "dayjs";
import { updatePriorityLevelHandler } from "./todoItems";

test("update priority level sets the correct date", async () => {
  const date = new Date(2021, 1, 1);
  const expected = dayjs(date).add(1, "day").toDate();
  const actual = updatePriorityLevelHandler(PriorityLevel.High, date);

  expect(actual.priorityLevel).toBe(PriorityLevel.High);
  expect(actual.dueDate).toStrictEqual(expected);
});
