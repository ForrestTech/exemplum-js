import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  createTodoItemSchema,
  updatePriorityLevelHandler,
} from "@features/Todo/todoItems";
import { PriorityLevel } from "@prisma/client";

export const todoItemRouter = router({
  create: protectedProcedure
    .input(createTodoItemSchema)
    .mutation(async ({ ctx, input }) => {
      const newTodoItem = await ctx.prisma.todoItem.create({
        data: input,
      });
      return newTodoItem;
    }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const todoLists = await ctx.prisma.todoItem.findMany();
    return todoLists;
  }),
  single: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    const todoList = await ctx.prisma.todoItem.findUnique({
      where: { id: input },
    });
    return todoList;
  }),
  inList: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    console.log("in list", input);
    const todoList = await ctx.prisma.todoItem.findMany({
      where: { todoListId: input },
    });
    return todoList;
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.bigint(),
        title: z.string().min(3, { message: "Title is required" }).max(255),
        notes: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.update({
        where: { id: input.id },
        data: input,
      });
      return todoItem;
    }),
  setPriority: protectedProcedure
    .input(
      z.object({ id: z.bigint(), priorityLevel: z.nativeEnum(PriorityLevel) })
    )
    .mutation(async ({ ctx, input }) => {
      const data = updatePriorityLevelHandler(input.priorityLevel, new Date());
      const todoItem = await ctx.prisma.todoItem.update({
        where: { id: input.id },
        data: data,
      });
      return todoItem;
    }),
  delete: protectedProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoItem.delete({
        where: { id: input },
      });
      return todoList;
    }),
  markComplete: protectedProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      //possible business logic here
      const todoList = await ctx.prisma.todoItem.update({
        where: { id: input },
        data: { isComplete: true, completedAt: new Date() },
      });
      return todoList;
    }),
});
