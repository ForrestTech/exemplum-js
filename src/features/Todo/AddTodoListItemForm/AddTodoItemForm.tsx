import { trpc } from "utils/trpc";
import { useZodForm } from "@features/common/Components/Forms/Form";
import { createTodoItemSchema } from "../todoItems";
import toast from "react-hot-toast";

const AddTodoItemForm = ({ todoListId }: { todoListId: bigint }) => {
  const trpcContext = trpc.useContext();
  const addTodoItem = trpc.todoItems.create.useMutation({
    onSuccess: async () => {
      await trpcContext.todoItems.all.invalidate();
      await trpcContext.todoItems.inList.invalidate(todoListId);
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
      todoListId,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await addTodoItem.mutateAsync(values);
        reset();
        toast.success("Todo item added");
      })}
    >
      <div className="grid max-w-xl grid-flow-col gap-4 border-b border-teal-500 py-2">
        <div>
          <input
            className="focus:shadow-outline w-80 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Title..."
            {...register("title")}
          />
          {errors.title?.message}
        </div>
        <div className="flex justify-end">
          <div>
            <input
              className="focus:shadow-outline mr-0 ml-auto items-end rounded bg-emerald-500 py-1.5 px-4 font-bold text-white hover:bg-emerald-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-500 dark:text-white"
              type="submit"
              value="Add"
              disabled={addTodoItem.isLoading || !isValid}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTodoItemForm;
