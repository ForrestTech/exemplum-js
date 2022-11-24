import clsx from "clsx";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { PriorityLevel, TodoItem } from "@prisma/client";
import Datepicker from "tailwind-datepicker-react";
import { claimEditModeAtom } from "../TodoListsItems";
import { trpc } from "utils/trpc";
import { Menu } from "@headlessui/react";
import { BarsArrowUpIcon } from "@heroicons/react/20/solid";
import { getEnumNames } from "@features/common/enumHelpers";
import toast from "react-hot-toast";

interface TodoListItemEditPanelProps {
  item: TodoItem;
}

const TodoListItemEditPanel = ({ item }: TodoListItemEditPanelProps) => {
  const [claimEditTodo] = useAtom(claimEditModeAtom);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showReminderDate, setShowReminderDate] = useState(false);

  const isEditMode = useMemo(() => {
    return claimEditTodo?.id === item.id;
  }, [claimEditTodo, item.id]);

  const utils = trpc.useContext();
  const updateDueDate = trpc.todoItems.updateDueDate.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.todoListId);
    },
  });

  const updateReminder = trpc.todoItems.updateReminder.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.todoListId);
    },
  });

  const setPriority = trpc.todoItems.setPriority.useMutation({
    onSuccess: (input) => {
      utils.todoItems.inList.invalidate(input.todoListId);
    },
  });

  const changeDueDate = (dueDate: Date) => {
    updateDueDate.mutateAsync({ id: item.id, dueDate });
    toast.success("Due date updated");
  };

  const changeReminder = (reminder: Date) => {
    updateReminder.mutateAsync({ id: item.id, reminder });
    toast.success("Reminder updated");
  };

  const changePriority = async (priority: PriorityLevel) => {
    await setPriority.mutateAsync({ id: item.id, priority });
    toast.success("Priority updated");
  };

  return (
    <div
      className={clsx(
        !isEditMode && "hidden",
        "flex max-w-xl p-4 hover:bg-gray-100 dark:bg-slate-800"
      )}
    >
      <div className="relative w-44">
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Due Date
        </label>
        <Datepicker
          options={{
            title: "Due Date",
            autoHide: true,
            todayBtn: false,
            clearBtn: true,
            datepickerClassNames: "top-15",
            defaultDate: item.dueDate ? item.dueDate : undefined,
          }}
          onChange={changeDueDate}
          show={showDueDate}
          setShow={(state: boolean) => setShowDueDate(state)}
        />
      </div>
      <div className="relative w-44 pl-4">
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Reminder Date
        </label>
        <Datepicker
          options={{
            title: "Reminder Date",
            autoHide: true,
            todayBtn: false,
            clearBtn: true,
            datepickerClassNames: "top-15",
            defaultDate: item.reminder ? item.reminder : undefined,
          }}
          onChange={changeReminder}
          show={showReminderDate}
          setShow={(state: boolean) => setShowReminderDate(state)}
        />
      </div>
      <div className="pt-8 pl-4 ">
        <Menu
          as="div"
          className="relative inline-block rounded-md  text-left dark:hover:bg-slate-600"
        >
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium uppercase text-white shadow-sm hover:bg-slate-900/5">
            {item.priorityLevel ?? "Set Priority"}
            <BarsArrowUpIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
          <Menu.Items
            as="section"
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-slate-400 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {getEnumNames(PriorityLevel).map((priority) => (
              <Menu.Item
                as="div"
                key={priority}
                onClick={() => changePriority(priority as PriorityLevel)}
              >
                <span className="block py-2 px-4 text-sm text-gray-700 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-600">
                  {priority}
                </span>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default TodoListItemEditPanel;