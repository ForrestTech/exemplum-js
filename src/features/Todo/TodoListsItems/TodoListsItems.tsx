import { TodoItem } from "@prisma/client";
import { atom, useAtom } from "jotai";
import { ChangeEvent, useMemo, useState } from "react";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { trpc } from "utils/trpc";
import toast from "react-hot-toast";
import clsx from "clsx";
import TodoListItemEditPanel from "./TodoListItemEditPanel/TodoListItemEditPanel";
import { updateTodoItemSchema } from "../todoItems";
import { useZodForm } from "@features/common/Components/Forms/Form";
import {
  isUniqueConstraintError,
  errorHandler,
} from "@features/common/errorHelpers";

export const claimEditModeAtom = atom<TodoItem | undefined>(undefined);

const TodoListsItems = ({ todoItem }: { todoItem: TodoItem[] | undefined }) => (
  <div>
    {todoItem &&
      todoItem.map((list) => (
        <TodoListItem key={list.id.toString()} item={list} />
      ))}
  </div>
);

const TodoListItem = ({ item }: { item: TodoItem }) => {
  const [claimEditTodo, setClaimEditTodo] = useAtom(claimEditModeAtom);
  const [complete, setComplete] = useState<boolean>(item.isComplete);

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
      const { canHandle, message } = errorHandler(error);
      if (canHandle) {
        toast.error(message);
      }
    }
  };

  const toggleCompleted = async (
    itemToComplete: TodoItem,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setComplete(event.currentTarget.checked);
    await toggleComplete.mutateAsync(itemToComplete.id);
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
          isEditMode && "bg-gray-100 dark:bg-slate-600",
          "flex p-8 shadow-md shadow-emerald-900 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600"
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
                complete && "line-through"
              )}
            >
              {item.title}
            </span>
            <span className="grow" />
            <PencilIcon
              title={!complete ? "Edit" : "Cant edit completed item"}
              onClick={() => editModeOn()}
              className={clsx(
                "ml-2 h-6 w-6 cursor-pointer",
                complete
                  ? "text-gray-200 dark:text-gray-400"
                  : "text-black dark:text-white"
              )}
            />
            <label
              htmlFor="default-toggle"
              className="relative ml-2 inline-flex cursor-pointer items-center"
              title="Mark as done"
            >
              <input
                type="checkbox"
                onChange={(event) => {
                  toggleCompleted(item, event);
                }}
                checked={complete}
                id="default-toggle"
                className="peer sr-only"
              ></input>
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:border-gray-600 dark:bg-gray-400 dark:peer-focus:ring-emerald-800"></div>
            </label>
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
