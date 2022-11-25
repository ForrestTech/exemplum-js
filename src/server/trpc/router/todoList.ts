import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { schema, updateTodoListSchema } from "@features/Todo/todoList";
import { Prisma } from "@prisma/client";

const defaultTodoListSelect = Prisma.validator<Prisma.TodoListSelect>()({
  id: true,
  title: true,
  color: true,
  createdAt: true,
  updatedAt: true,
});

export const todoListsRouter = router({
  add: protectedProcedure.input(schema).mutation(async ({ ctx, input }) => {
    const newTodoList = await ctx.prisma.todoList.create({
      select: defaultTodoListSelect,
      data: input,
    });
    return newTodoList;
  }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const todoLists = await ctx.prisma.todoList.findMany({
      select: defaultTodoListSelect,
    });
    return todoLists;
  }),
  byId: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    const todoList = await ctx.prisma.todoList.findUnique({
      select: defaultTodoListSelect,
      where: { id: input },
    });
    return todoList;
  }),
  update: protectedProcedure
    .input(updateTodoListSchema)
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoList.update({
        select: defaultTodoListSelect,
        where: { id: input.id },
        data: input,
      });
      return todoList;
    }),
  delete: protectedProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoList.delete({
        select: defaultTodoListSelect,
        where: { id: input },
      });
      return todoList;
    }),
});
