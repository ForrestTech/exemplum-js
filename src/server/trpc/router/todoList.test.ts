/**
 * Integration test example for the `todoList` router
 */
import { createContextInner } from "../context";
import { AppRouter, appRouter } from "./_app";
import { inferProcedureInput } from "@trpc/server";

test("add and get post", async () => {
  const ctx = await createContextInner({
    session: {
      user: {
        id: "1",
        email: "email@email.com",
        name: "name",
      },
      expires: "1",
    },
  });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["todoLists"]["add"]> = {
    title: "hello test",
    color: "#10B981",
  };

  const todoList = await caller.todoLists.add(input);
  const single = await caller.todoLists.byId(todoList.id);

  expect(single).toMatchObject(input);
});

test("2 + 2 = 4", async () => {
  const four = 2 + 2;

  expect(four).toBe(4);
});

export {};
