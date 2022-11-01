/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { OutstandingTasks } from "@features/common/OutstandingTasks/OutstandingTasks";
import { Welcome } from "@features/common/Welcome/Welcome";
import { NavBar } from "@features/common/Navbar/NavBar";
import { Footer } from "@features/common/Footer/Footer";

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
      <div className="h-full bg-white dark:bg-neutral-800">
        <NavBar />
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center  p-4 ">
          <Welcome />
          <OutstandingTasks />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
