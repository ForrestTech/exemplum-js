import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";
import { withAuthRequired } from "@features/common/withAuth";
import Layout from "@features/common/Components/Layout/Layout";
import LoadingWrapper from "@features/common/Components/LoadingWrapper/LoadingWrapper";
import AddTodoItemForm from "@features/Todo/AddTodoListItemForm/AddTodoItemForm";
import TodoListsItems from "@features/Todo/TodoListsItems/TodoListsItems";

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
  } = trpc.todoList.single.useQuery(listIdBI, {
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
        <div className="flex">
          <div className="grow">
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
        </div>
      </Layout>
    </>
  );
};

export default withAuthRequired(Lists);
