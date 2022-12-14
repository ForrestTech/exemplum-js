import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { trpc, AppRouterInputTypes, AppRouterOutputTypes } from "utils/trpc";
import {
  CheckIcon,
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import Tooltip from "@features/common/Components/Tooltip/Tooltip";

type TodoList = AppRouterOutputTypes["todoLists"]["add"];
type TodoListUpdate = AppRouterInputTypes["todoLists"]["update"];

const TodoLists = ({ todoLists }: { todoLists: TodoList[] }) => {
  return (
    <div>
      {todoLists &&
        todoLists.map((list) => (
          <TodoListEntry key={list.id.toString()} todoList={list} />
        ))}
    </div>
  );
};

const TodoListEntry = ({ todoList }: { todoList: TodoList }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState<string>(todoList.title);

  const utils = trpc.useContext();
  const updateTodo = trpc.todoLists.update.useMutation({
    onSuccess: (input) => {
      utils.todoLists.byId.invalidate(input.id);
    },
  });
  const deleteToDo = trpc.todoLists.delete.useMutation({
    onSuccess: () => {
      utils.todoLists.all.invalidate();
    },
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent,
    listToEdit: TodoList
  ) => {
    if (event.key === "Enter") {
      updateList({
        id: listToEdit.id,
        title: listTitle,
      });
      setEditMode(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setListTitle(event.target.value);
  };

  const updateList = (listToUpdate: TodoListUpdate) => {
    const updated = listToUpdate;
    updated.title = listTitle;

    updateTodo.mutate(updated);

    setEditMode(false);
  };

  const handleDelete = (listToDelete: TodoList) => {
    if (confirm("Are you sure you want to delete this list?") === true) {
      deleteToDo.mutate(listToDelete.id);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="mt-2 flex max-w-xl p-8 shadow-md dark:bg-dark-700">
      {editMode ? (
        <>
          <input
            className="focus:shadow-outline w-96 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            autoFocus
            id="title"
            type="text"
            placeholder="Title"
            value={listTitle}
            onChange={(event) => handleChange(event)}
            onKeyPress={(event) => handleKeyPress(event, todoList)}
          />
          <span className="grow" />
          <Tooltip label="Save">
            <CheckIcon
              onClick={() =>
                updateList({
                  id: todoList.id,
                  title: listTitle,
                })
              }
              className="h-6 w-6 cursor-pointer dark:text-white"
            />
          </Tooltip>
          <Tooltip label="Cancel">
            <XMarkIcon
              className="ml-2 h-6 w-6 cursor-pointer dark:text-white"
              onClick={() => handleCancel()}
            />
          </Tooltip>
        </>
      ) : (
        <>
          <p className="inline" style={{ color: todoList.color }}>
            {todoList.title}
          </p>
          <span className="grow" />
          <Tooltip label="Edit">
            <PencilIcon
              onClick={handleEdit}
              className="ml-2 h-6 w-6 cursor-pointer dark:text-white"
            />
          </Tooltip>
          <Tooltip label="View">
            <Link href={`/todolists/items?listId=${todoList.id}`} passHref>
              <ListBulletIcon className="ml-2 h-6 w-6 cursor-pointer dark:text-white" />
            </Link>
          </Tooltip>
          <Tooltip label="Delete">
            <TrashIcon
              onClick={() => handleDelete(todoList)}
              className="ml-2 h-6 w-6 cursor-pointer dark:text-white"
            />
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default TodoLists;
