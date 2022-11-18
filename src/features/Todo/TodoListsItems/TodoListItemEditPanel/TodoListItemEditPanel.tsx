import clsx from "clsx";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { TodoItem } from "@prisma/client";
import Datepicker from "tailwind-datepicker-react";
import { claimEditModeAtom } from "../TodoListsItems";
import { trpc } from "utils/trpc";

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

  const handleChangeDueDate = (dueDate: Date) => {
    updateDueDate.mutate({ id: item.id, dueDate });
  };

  const handleChangeReminder = (reminder: Date) => {
    updateReminder.mutate({ id: item.id, reminder });
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
          onChange={handleChangeDueDate}
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
          onChange={handleChangeReminder}
          show={showReminderDate}
          setShow={(state: boolean) => setShowReminderDate(state)}
        />
      </div>
    </div>
  );
};

export default TodoListItemEditPanel;
