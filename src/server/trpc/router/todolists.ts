import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { validColor } from "@features/Todo/todolist";

export const todoListsRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        color: z.string().refine((color) => validColor(color), {
          message: "Color must be a valid hex color",
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newTodoList = await ctx.prisma.todoList.create({
        data: input,
      });
      return newTodoList;
    }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const todoLists = await ctx.prisma.todoList.findMany();
    return todoLists;
  }),
  list: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const todoList = await ctx.prisma.todoList.findUnique({
      where: { id: input },
    });
    return todoList;
  }),
  update: protectedProcedure
    .input(z.object({ id: z.number(), title: z.string(), color: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoList.update({
        where: { id: input.id },
        data: input,
      });
      return todoList;
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const todoList = await ctx.prisma.todoList.delete({
        where: { id: input },
      });
      return todoList;
    }),
});
