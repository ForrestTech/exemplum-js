import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  createTodoItemSchema,
  updatePriorityLevelHandler,
  updateTodoItemSchema,
} from "@features/Todo/todoItems";
import { PriorityLevel } from "@prisma/client";
import { now } from "@features/common/dateHelpers";

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
    const todoItem = await ctx.prisma.todoItem.findMany();
    return todoItem;
  }),
  single: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    const todoItem = await ctx.prisma.todoItem.findUnique({
      where: { id: input },
    });
    return todoItem;
  }),
  inList: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    const todoItem = await ctx.prisma.todoItem.findMany({
      where: { todoListId: input },
    });
    return todoItem;
  }),
  update: protectedProcedure
    .input(updateTodoItemSchema)
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.update({
        where: { id: input.id },
        data: input,
      });
      return todoItem;
    }),
  setPriority: protectedProcedure
    .input(
      z.object({
        id: z.bigint(),
        priority: z.nativeEnum(PriorityLevel),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = updatePriorityLevelHandler(input.priority, now());
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
  toggleComplete: protectedProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.findUnique({
        where: { id: input },
      });

      if (todoItem) {
        const updatedItem = await ctx.prisma.todoItem.update({
          where: { id: input },
          data: {
            isComplete: !todoItem.isComplete,
            completedAt: todoItem.isComplete ? null : now(),
          },
        });
        return updatedItem;
      }
    }),
  updateDueDate: protectedProcedure
    .input(z.object({ id: z.bigint(), dueDate: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.update({
        where: { id: input.id },
        data: input,
      });
      return todoItem;
    }),
  updateReminder: protectedProcedure
    .input(z.object({ id: z.bigint(), reminder: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.update({
        where: { id: input.id },
        data: input,
      });
      return todoItem;
    }),
});
