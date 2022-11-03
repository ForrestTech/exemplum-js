/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { OutstandingTasks } from "@features/common/Components/OutstandingTasks/OutstandingTasks";
import { Welcome } from "@features/common/Components/Welcome/Welcome";
import Layout from "@features/common/Components/Layout/Layout";

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // const mutation = trpc.example.createExample.useMutation();

  // const handleCreateExample = async () => {
  //   const name = "Jane Doe";
  //   mutation.mutate({ name });
  // };

  return (
    <>
      <Head>
        <title>Exemplum JS - Get off to a good start</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center p-8">
          <Welcome />
          <OutstandingTasks />
        </div>
      </Layout>
    </>
  );
};

export default Home;
