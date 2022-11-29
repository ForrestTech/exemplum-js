import { NextPage } from "next";
import Head from "next/head";
import { trpc } from "utils/trpc";
import { withAuthRequired } from "@features/common/withAuth";

import Layout from "@features/common/Components/Layout/Layout";
import LoadingWrapper from "@features/common/Components/LoadingWrapper/LoadingWrapper";
import AddTodoListsForm from "@features/Todo/AddTodoListsForm/AddTodoListsForm";
import TodoLists from "@features/Todo/TodoLists/TodoLists";

const Lists: NextPage = () => {
  const { data, isLoading, error } = trpc.todoLists.all.useQuery();

  return (
    <>
      <Head>
        <title>Todo Lists</title>
      </Head>
      <Layout>
        <div className="flex flex-col justify-center ">
          <h1 className="mb-8 text-4xl dark:text-white">Todo Lists</h1>
          <div className="p-4"></div>
          <AddTodoListsForm />
          <div className="p-4"></div>
          <LoadingWrapper data={data} isLoading={isLoading} error={error}>
            {data && <TodoLists todoLists={data} />}
          </LoadingWrapper>
        </div>
      </Layout>
    </>
  );
};

export default withAuthRequired(Lists);
