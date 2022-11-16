import { trpc } from "utils/trpc";
import { useZodForm } from "@features/common/Components/Forms/Form";
import { createTodoItemSchema } from "../todoItems";
import toast from "react-hot-toast";

const AddTodoListItemForm = ({ todoListId }: { todoListId: bigint }) => {
  const trpcContext = trpc.useContext();
  const addTodoItem = trpc.todoItems.create.useMutation({
    onSuccess: async () => {
      await trpcContext.todoLists.all.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useZodForm({
    schema: createTodoItemSchema,
    defaultValues: {
      title: "",
      notes: "",
      todoListId,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await addTodoItem.mutateAsync(values);
        reset();
        toast.success("Todo list added");
      })}
    >
      <div className="grid max-w-xl grid-cols-3 items-center gap-4 border-b border-teal-500 py-2">
        <div className="py-1 text-xs italic text-red-500">
          {errors.title?.message}
        </div>
        <div className="py-1 text-xs italic text-red-500">
          {errors.notes?.message}
        </div>
        <div></div>
        <div>
          <input
            className="focus:shadow-outline w-48 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Title..."
            {...register("title")}
          />
        </div>
        <div>
          <label className="ml-4 align-top dark:text-white">Color</label>
          <input
            type="color"
            placeholder="Color..."
            className="ml-4"
            {...register("notes")}
          />
        </div>
        <div className="flex">
          <input
            className="focus:shadow-outline mr-0 ml-auto content-end items-end rounded bg-emerald-500 py-1.5 px-4 font-bold text-white hover:bg-emerald-700 focus:outline-none disabled:cursor-not-allowed  disabled:bg-neutral-500 dark:text-white"
            type="submit"
            value="Add"
            disabled={addTodoItem.isLoading || !isValid}
          />
        </div>
      </div>
    </form>
  );
};

export default AddTodoListItemForm;
