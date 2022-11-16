import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { trpc } from "utils/trpc";
import { TodoItem } from "@prisma/client";
import toast from "react-hot-toast";
import clsx from "clsx";
import Layout from "@features/common/Components/Layout/Layout";
import LoadingWrapper from "@features/common/Components/LoadingWrapper/LoadingWrapper";
import Tooltip from "@features/common/Components/Tooltip/Tooltip";
import { withAuthRequired } from "@features/common/withAuth";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import AddTodoItemForm from "@features/Todo/AddTodoListItemForm/AddTodotemForm";

const Lists: NextPage = () => {
  const router = useRouter();
  const { listId } = router.query;

  if (!listId) {
    return null;
  }
  const listIdBI = BigInt(listId as string);

  const {
    data: todoItems,
    isLoading: itemsLoading,
    error: itemsError,
  } = trpc.todoItems.inList.useQuery(listIdBI, {
    queryKeyHashFn: () => {
      return "todoItems.inList." + listIdBI.toString();
    },
  });

  const {
    data: list,
    isLoading: listLoading,
    error: listError,
  } = trpc.todoLists.single.useQuery(listIdBI, {
    queryKeyHashFn: () => {
      return "todoLists.single." + listIdBI.toString();
    },
  });

  return (
    <>
      <Head>
        <title>Todo Lists</title>
      </Head>
      <Layout>
        <div className="flex flex-col justify-center p-8">
          <h1 className="mb-8 text-4xl dark:text-white">Todo Lists</h1>
          <h2 className="mb-8 text-2xl dark:text-white">
            <LoadingWrapper
              data={list}
              isLoading={listLoading}
              error={listError}
            >
              {list?.title}
            </LoadingWrapper>
          </h2>
          <div className="p-4"></div>
          <AddTodoItemForm todoListId={listIdBI} />
          <div className="p-4"></div>
          <LoadingWrapper
            data={todoItems}
            isLoading={itemsLoading}
            error={itemsError}
          >
            {todoItems && <TodoListsItems todoItem={todoItems} />}
          </LoadingWrapper>
        </div>
      </Layout>
    </>
  );
};

const TodoListsItems = ({ todoItem }: { todoItem: TodoItem[] | undefined }) => (
  <div>
    {todoItem &&
      todoItem.map((list) => (
        <TodoListItem key={list.id.toString()} item={list} />
      ))}
  </div>
);

const TodoListItem = ({ item }: { item: TodoItem }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(item.title);
  const [complete, setComplete] = useState<boolean>(item.isComplete);

  const utils = trpc.useContext();
  const updateTodo = trpc.todoItems.update.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.id);
    },
  });
  const markComplete = trpc.todoItems.markComplete.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.id);
    },
  });
  const deleteToDo = trpc.todoItems.delete.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.id);
    },
  });

  const handleEdit = () => {
    if (!complete) {
      setEditMode(true);
    }
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent,
    itemToEdit: TodoItem
  ) => {
    if (event.key === "Enter") {
      handleSave(itemToEdit);
      setEditMode(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSave = (itemToSave: TodoItem) => {
    const updated = itemToSave;
    updated.title = title;

    updateTodo.mutate(updated);

    setEditMode(false);
  };

  const handleCompleted = (
    itemToComplete: TodoItem,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setComplete(event.currentTarget.checked);
    markComplete.mutate(itemToComplete.id);
  };

  const handleDelete = (itemToDelete: TodoItem) => {
    deleteToDo.mutate(itemToDelete.id);
    toast.error("Item deleted");
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="mt-2 flex w-1/2 p-8 shadow-md dark:bg-slate-700">
      {editMode ? (
        <>
          <input
            className="focus:shadow-outline w-96 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            autoFocus
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => handleChange(event)}
            onKeyPress={(event) => handleKeyPress(event, item)}
          />
          <span className="grow" />
          <Tooltip label="Save">
            <CheckIcon
              onClick={() => handleSave(item)}
              className="h-6 w-6 cursor-pointer dark:text-white"
            />
          </Tooltip>
          <Tooltip label="Cancel">
            <XMarkIcon
              onClick={() => handleCancel()}
              className="ml-2 h-6 w-6 cursor-pointer dark:text-white"
            />
          </Tooltip>
        </>
      ) : (
        <>
          {item.isComplete ? (
            <span className="inline line-through dark:text-white">
              {item.title}
            </span>
          ) : (
            <span className="inline dark:text-white">{item.title}</span>
          )}
          <span className="grow" />
          <Tooltip label={!complete ? "Edit" : "Cant edit completed item"}>
            <PencilIcon
              onClick={() => handleEdit()}
              className={clsx(
                "ml-2 h-6 w-6 cursor-pointer",
                complete
                  ? "text-gray-200 dark:text-gray-400"
                  : "text-black dark:text-white"
              )}
            />
          </Tooltip>
          <Tooltip label="Mark as done">
            <label
              htmlFor="default-toggle"
              className="relative ml-2 inline-flex cursor-pointer items-center"
            >
              <input
                type="checkbox"
                onChange={(event) => {
                  handleCompleted(item, event);
                }}
                checked={complete}
                id="default-toggle"
                className="peer sr-only"
              ></input>
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:border-gray-600 dark:bg-gray-400 dark:peer-focus:ring-emerald-800"></div>
            </label>
          </Tooltip>
          <Tooltip label="Delete">
            <TrashIcon
              onClick={() => handleDelete(item)}
              className="ml-2 h-6 w-6 cursor-pointer dark:text-white"
            />
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default withAuthRequired(Lists);
