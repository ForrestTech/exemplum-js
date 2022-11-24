import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import {
  createTodoItemSchema,
  updatePriorityLevelHandler,
  updateTodoItemSchema,
} from "@features/Todo/todoItems";
import { PriorityLevel, Prisma } from "@prisma/client";
import { now } from "@features/common/dateHelpers";

/**
 * Default selector for TodoItem.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 */
const defaultTodoItemSelect = Prisma.validator<Prisma.TodoItemSelect>()({
  id: true,
  title: true,
  notes: true,
  todoListId: true,
  isComplete: true,
  priorityLevel: true,
  dueDate: true,
  reminder: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const todoItemRouter = router({
  create: protectedProcedure
    .input(createTodoItemSchema)
    .mutation(async ({ ctx, input }) => {
      const newTodoItem = await ctx.prisma.todoItem.create({
        select: defaultTodoItemSelect,
        data: input,
      });
      return newTodoItem;
    }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const todoItem = await ctx.prisma.todoItem.findMany({
      select: defaultTodoItemSelect,
    });
    return todoItem;
  }),
  single: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    const todoItem = await ctx.prisma.todoItem.findUnique({
      select: defaultTodoItemSelect,
      where: { id: input },
    });
    return todoItem;
  }),
  inList: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    const todoItem = await ctx.prisma.todoItem.findMany({
      select: defaultTodoItemSelect,
      where: { todoListId: input },
    });
    return todoItem;
  }),
  update: protectedProcedure
    .input(updateTodoItemSchema)
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.update({
        select: defaultTodoItemSelect,
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
        select: defaultTodoItemSelect,
        where: { id: input.id },
        data: data,
      });
      return todoItem;
    }),
  delete: protectedProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoItem.delete({
        select: defaultTodoItemSelect,
        where: { id: input },
      });
      return todoList;
    }),
  toggleComplete: protectedProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.findUnique({
        select: defaultTodoItemSelect,
        where: { id: input },
      });

      if (todoItem) {
        const updatedItem = await ctx.prisma.todoItem.update({
          select: defaultTodoItemSelect,
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
        select: defaultTodoItemSelect,
        where: { id: input.id },
        data: input,
      });
      return todoItem;
    }),
  updateReminder: protectedProcedure
    .input(z.object({ id: z.bigint(), reminder: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const todoItem = await ctx.prisma.todoItem.update({
        select: defaultTodoItemSelect,
        where: { id: input.id },
        data: input,
      });
      return todoItem;
    }),
});