import { trpc } from "utils/trpc";
import { useZodForm } from "@features/common/Components/Forms/Form";
import { schema } from "../todoList";
import toast from "react-hot-toast";
import Button from "@features/common/Components/Button/Button";

const AddTodoListsForm = () => {
  const trpcContext = trpc.useContext();
  const addTodoList = trpc.todoLists.add.useMutation({
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
    schema,
    defaultValues: {
      title: "",
      color: "#10b981",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await addTodoList.mutateAsync(values);
        reset();
        toast.success("Todo list added");
      })}
    >
      <div className="grid max-w-xl grid-cols-3 items-center gap-4 border-b border-teal-500 py-2">
        <div className="py-1 text-xs italic text-red-500">
          {errors.title?.message}
        </div>
        <div className="py-1 text-xs italic text-red-500">
          {errors.color?.message}
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
            {...register("color")}
          />
        </div>
        <div className="flex">
          <Button
            type="submit"
            intent="primary"
            disabled={addTodoList.isLoading || !isValid}
          >
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTodoListsForm;
