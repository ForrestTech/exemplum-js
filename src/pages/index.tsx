import type { NextPage } from "next";
import Head from "next/head";

import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { OutstandingTasks } from "@features/common/OutstandingTasks/OutstandingTasks";
import { Welcome } from "@features/common/Welcome/Welcome";
import { NavBar } from "@features/common/Navbar/NavBar";

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
      <NavBar />
      <div className="bg-white dark:bg-neutral-800">
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center  p-4 ">
          <Welcome />
          {/* <button onClick={handleCreateExample} disabled={mutation.isLoading}>
            Create Example
          </button> */}
          <OutstandingTasks />
          {/* <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div> */}
          {/* <AuthShowcase /> */}
        </main>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
