import { trpc } from "utils/trpc";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddTodoListsForm {
  title: string;
  color: string;
}

const schema = z
  .object({
    title: z.string().min(3).max(255),
    color: z
      .string({
        required_error: "Color is required",
      })
      .length(7, { message: "Must be a hex color" })
      .startsWith("#", { message: "Must be a hex color" }),
  })
  .required();

const AddTodoListsForm = () => {
  const trpcContext = trpc.useContext();
  const addTodoList = trpc.todoLists.create.useMutation({
    onSuccess: async () => {
      await trpcContext.todoLists.all.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoListsForm>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={handleSubmit(async (values) => {
        await addTodoList.mutateAsync(values);
        reset();
      })}
    >
      <div className="flex items-center border-b border-teal-500 py-2">
        <div>
          <div className="py-1 text-xs italic text-red-500">
            {errors.title?.message}
          </div>
          <input
            className="focus:shadow-outline w-48 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Title..."
            {...register("title")}
          />
        </div>
        <div className="pl-4">
          <div className="py-1 text-xs italic text-red-500">
            {errors.color?.message}
          </div>
          <input
            placeholder="Color..."
            className="focus:shadow-outline w-24 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            {...register("color")}
          />
        </div>
        <div className="pl-4">
          <input
            className="focus:shadow-outline mt-2 rounded bg-emerald-500 py-1.5 px-4 font-bold text-white hover:bg-emerald-700 focus:outline-none dark:text-white"
            type="submit"
            value="Add"
            disabled={addTodoList.isLoading}
          />
        </div>
      </div>
    </form>
  );
};

export default AddTodoListsForm;
