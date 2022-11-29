import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { AppRouterOutputTypes, trpc } from "utils/trpc";
import toast from "react-hot-toast";
import clsx from "clsx";
import TodoListItemEditPanel from "./TodoListItemEditPanel/TodoListItemEditPanel";
import { updateTodoItemSchema } from "../todoItems";
import { useZodForm } from "@features/common/Components/Forms/Form";
import { handleError } from "@features/common/errors";
import Toggle from "@features/common/Components/Toggle/Toggle";

type TodoItem = AppRouterOutputTypes["todoItems"]["create"];

export const claimEditModeAtom = atom<TodoItem | undefined>(undefined);

const TodoListsItems = ({
  todoItems,
}: {
  todoItems: TodoItem[] | undefined;
}) => {
  const utils = trpc.useContext();
  const markAsComplete = trpc.todoItems.markAsComplete.useMutation({
    onSuccess: () => {
      if (todoItems) {
        utils.todoItems.inList.invalidate(todoItems[0]?.todoListId);
      }
    },
  });

  const handleComplete = async () => {
    await markAsComplete.mutateAsync(todoItems?.map((i) => i.id) ?? []);
  };

  return (
    <div>
      <div className="flex max-w-xl justify-end">
        <div>
          <input
            className="focus:shadow-outline mr-0 ml-auto cursor-pointer items-end rounded bg-brand-500 py-1.5 px-4 font-bold text-white hover:bg-brand-700 focus:outline-none disabled:cursor-not-allowed  disabled:bg-neutral-500 dark:text-white"
            type="button"
            onClick={handleComplete}
            value="Complete All"
            disabled={todoItems?.every((i) => i.isComplete)}
          />
        </div>
      </div>
      {todoItems &&
        todoItems.map((item) => (
          <TodoListItem key={item.id.toString()} item={item} />
        ))}
    </div>
  );
};

const TodoListItem = ({ item }: { item: TodoItem }) => {
  const [claimEditTodo, setClaimEditTodo] = useAtom(claimEditModeAtom);

  const utils = trpc.useContext();
  const updateTodo = trpc.todoItems.update.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.todoListId);
    },
  });
  const toggleComplete = trpc.todoItems.toggleComplete.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input?.todoListId);
    },
  });
  const deleteToDo = trpc.todoItems.delete.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.todoListId);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useZodForm({
    schema: updateTodoItemSchema,
    defaultValues: {
      title: item.title,
      id: item.id,
    },
  });

  const editModeOn = () => {
    setClaimEditTodo(item);
  };

  const saveTodo = async ({ id, title }: { id: bigint; title: string }) => {
    try {
      await updateTodo.mutateAsync({ id, title });
      setClaimEditTodo(undefined);
      toast.success("Item updated");
    } catch (error) {
      const { canHandle, applicationError } = handleError(error);
      if (canHandle) {
        toast.error(applicationError?.message);
      }
    }
  };

  const toggleCompleted = async (itemToToggle: TodoItem) => {
    await toggleComplete.mutateAsync(itemToToggle.id);
  };

  const deleteTodo = async (itemToDelete: TodoItem) => {
    await deleteToDo.mutateAsync(itemToDelete.id);
    toast.error("Item deleted");
  };

  const cancelEdit = () => {
    reset();
    setClaimEditTodo(undefined);
  };

  const isEditMode = useMemo(() => {
    return claimEditTodo?.id === item.id;
  }, [claimEditTodo, item.id]);

  return (
    <div className="grid-row-2 mt-2 grid max-w-xl">
      <div
        className={clsx(
          isEditMode && "bg-gray-100 dark:bg-dark-600",
          "flex p-8 shadow-md shadow-brand-900 hover:bg-gray-100 dark:bg-dark-700 dark:hover:bg-dark-600"
        )}
      >
        {isEditMode ? (
          <form
            className="grid grid-flow-col"
            onSubmit={handleSubmit(async (values) => {
              await saveTodo(values);
            })}
          >
            <div>
              <input
                className="focus:shadow-outline w-96 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                autoFocus
                id="title"
                type="text"
                placeholder="Title"
                {...register("title")}
                onKeyPress={async (event) => {
                  if (event.key === "Enter") {
                    await handleSubmit(async (values) => {
                      await saveTodo(values);
                    });
                  }
                }}
              />
              {errors.title?.message && (
                <div className="text-red-500">{errors.title?.message}</div>
              )}
            </div>
            <span className="grow" />
            <CheckIcon
              title="Save"
              onClick={() =>
                handleSubmit(async (values) => {
                  await saveTodo(values);
                })
              }
              className={clsx(
                "ml-2 mt-2 h-6 w-6 cursor-pointer",
                isValid
                  ? "text-gray-200 dark:text-gray-400"
                  : "text-black dark:text-white"
              )}
            />
            <XMarkIcon
              title="Cancel"
              onClick={() => cancelEdit()}
              className="ml-2 mt-2 h-6 w-6 cursor-pointer dark:text-white"
            />
          </form>
        ) : (
          <>
            <span
              className={clsx(
                "inline dark:text-white",
                item.isComplete && "line-through"
              )}
            >
              {item.title}
            </span>
            <span className="grow" />
            <PencilIcon
              title={!item.isComplete ? "Edit" : "Cant edit completed item"}
              onClick={() => editModeOn()}
              className={clsx(
                "ml-2 h-6 w-6 cursor-pointer",
                item.isComplete
                  ? "text-gray-200 dark:text-gray-400"
                  : "text-black dark:text-white"
              )}
            />
            <Toggle
              id={`toggle-${item.id}`}
              isOn={item.isComplete}
              onToggle={() => toggleCompleted(item)}
              toolTip="Toggle done"
            />
            <TrashIcon
              title="Delete"
              onClick={() => deleteTodo(item)}
              className="ml-2 h-6 w-6 cursor-pointer dark:text-white"
            />
          </>
        )}
      </div>
      <TodoListItemEditPanel item={item} />
    </div>
  );
};

export default TodoListsItems;
