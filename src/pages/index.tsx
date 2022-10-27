import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Script from "next/script";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // const mutation = trpc.example.createExample.useMutation();

  // const handleCreateExample = async () => {
  //   const name = "Jane Doe";
  //   mutation.mutate({ name });
  // };

  return (
    <>
      <AppHead title="Exemplum JS - Get off to a good start" />
      <NavBar />
      <div className="bg-white dark:bg-slate-800">
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center  p-4 ">
          <Welcome />
          {/* <button onClick={handleCreateExample} disabled={mutation.isLoading}>
            Create Example
          </button> */}
          <TaskList />
          <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div>
          <AuthShowcase />
        </main>
      </div>
    </>
  );
};

export default Home;

const Welcome = () => (
  <>
    <div>
      <div id="logo-wrapper" className="flex justify-center pt-24">
        <Image
          src="/exemplum-logo.svg"
          alt="Exemplum Logo"
          width="400"
          height="260"
        />
      </div>
      <div className="text-center text-5xl font-light leading-normal text-emerald-500">
        Get off to a good start
      </div>
      <div className="text-center text-4xl font-light leading-normal text-emerald-500">
        A template for better full stack JS development
      </div>
      <div className="px-36 text-center text-2xl font-light dark:text-white">
        Exemplum is the ideal starting point for full stack developers who want
        to rapidly build amazing applications using a good starting point for
        libraries and tools.
      </div>
      <div className="flex justify-center p-4 pt-12">
        <button
          type="button"
          className="text-md mr-2 mb-2 rounded-md bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-12 py-2.5 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
        >
          GETTING STARTED
        </button>
        <button
          type="button"
          className="text-md mr-2 mb-2 rounded-md bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 px-12 py-2.5 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800"
        >
          GITHUB
        </button>
      </div>
    </div>
  </>
);

const AppHead = ({ title }: { title: string }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
  </>
);

const TaskList = () => (
  <div>
    <p className="font-medium dark:text-white">Still to do:</p>
    <ul className="dark:text-white">
      <li>Create Icon Links</li>
      <li>Create Navbar dropdown</li>
      <li>Signin/out in Navbar</li>
      <li>Create footer</li>
      <li>Create side menu</li>
      <li>Add Main logo</li>
      <li>Add Main Text and buttons</li>
      <li>Add side menu</li>
      <li>Authentication on pages</li>
      <li>Weather forecast endpoint</li>
      <li>Weather forecast page</li>
      <li>
        Get preview working
        https://vercel.com/docs/concepts/git/vercel-for-github Pull request
        feedback
      </li>
      <li>Get production working</li>
      <li>Task list API</li>
      <li>Task list UI</li>
      <li>Vercel analytics @vercel/analytics</li>
      <li>Log rocket integration</li>
      <li>Toast notification integration</li>
      <li>React table integration</li>
      <li>Ably integration</li>
      <li>Growthbook integration</li>
      <li>Schedule Task Solution</li>
      <li>SaaS messaging functions</li>
    </ul>
  </div>
);

const SupportDropDown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium uppercase text-white shadow-sm hover:bg-slate-900/5">
          Support
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <span className="block py-2 px-4 text-sm text-gray-700 dark:text-gray-400">
                Community Support
              </span>
            </Menu.Item>
            <Menu.Item>
              <a
                href="#"
                className="block  px-4 py-2 text-sm font-medium text-emerald-500 hover:bg-gray-400/5 hover:underline"
              >
                Github Discussions
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const NavBar = () => (
  <nav className="bg-emerald-500  dark:bg-gray-900">
    <div className="container mx-auto flex flex-wrap items-center justify-between p-3">
      <span className="self-center whitespace-nowrap text-2xl font-light tracking-wider text-white">
        <Link href="/">Exemplum</Link>
      </span>
      <div>
        <SupportDropDown />
        <span className="h-8 border-l-2 border-white" />
      </div>
    </div>
  </nav>
);

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
