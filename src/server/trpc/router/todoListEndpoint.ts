import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { schema, updateTodoListSchema } from "@features/Todo/todoList";

export const todoListsRouter = router({
  create: protectedProcedure.input(schema).mutation(async ({ ctx, input }) => {
    const newTodoList = await ctx.prisma.todoList.create({
      data: input,
    });
    return newTodoList;
  }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const todoLists = await ctx.prisma.todoList.findMany();
    return todoLists;
  }),
  single: protectedProcedure.input(z.bigint()).query(async ({ ctx, input }) => {
    const todoList = await ctx.prisma.todoList.findUnique({
      where: { id: input },
    });
    return todoList;
  }),
  update: protectedProcedure
    .input(updateTodoListSchema)
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoList.update({
        where: { id: input.id },
        data: input,
      });
      return todoList;
    }),
  delete: protectedProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoList.delete({
        where: { id: input },
      });
      return todoList;
    }),
});
