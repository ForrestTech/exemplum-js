import { PriorityLevel } from "@prisma/client";
import dayjs from "dayjs";
import {
  scheduleDueDateHandler,
  updatePriorityLevelHandler,
} from "./todoItems";

test("Update priority level sets the correct date", async () => {
  const date = new Date(2021, 1, 1);
  const expected = dayjs(date).add(1, "day").toDate();
  const actual = updatePriorityLevelHandler(PriorityLevel.High, date);

  expect(actual.priorityLevel).toBe(PriorityLevel.High);
  expect(actual.dueDate).toStrictEqual(expected);
});

test("Schedule Due Date return success when there is a date range greater than 1", async () => {
  const date = new Date(2021, 1, 5);
  const actual = scheduleDueDateHandler(
    [
      {
        id: BigInt(1),
        dueDate: new Date(2021, 1, 1),
      },
      {
        id: BigInt(2),
        dueDate: new Date(2021, 1, 2),
      },
    ],
    BigInt(1),
    date
  );

  expect(actual.isSuccess).toBe(true);
});

test("Failing Test", () => {
  expect(true).toBe(false);
});
