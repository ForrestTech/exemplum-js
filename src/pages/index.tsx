import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Script from "next/script";
import Link from "next/link";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const mutation = trpc.example.createExample.useMutation();

  const handleCreateExample = async () => {
    const name = "Jane Doe";
    mutation.mutate({ name });
  };

  return (
    <>
      <AppHead title="Exemplum JS - Get off to a good start" />
      <NavBar />
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <Welcome />
        <button onClick={handleCreateExample} disabled={mutation.isLoading}>
          Create Example
        </button>
        <TaskList />
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
      </main>
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
      <div className="text-center text-5xl font-light leading-normal text-teal-500">
        Get off to a good start
      </div>
      <div className="text-center text-4xl font-light leading-normal text-teal-500">
        A template for better full stack JS development
      </div>
      <div className="px-36 text-center text-2xl font-light">
        Exemplum is the ideal starting point for full stack developers who want
        to rapidly build amazing applications using a good starting point for
        libraries and tools.
      </div>
      <div className="flex justify-center p-4 pt-12">
        <button
          type="button"
          className="text-md mr-2 mb-2 rounded-md bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-12 py-2.5 text-center font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
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
      <meta name="description" content="Get off to a good start. Exemplum" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Script
      id="flowbite"
      src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"
    />
  </>
);

const TaskList = () => (
  <div>
    <p className="font-medium">Still to do:</p>
    <ul>
      <li>Create Basic Page Layout</li>
      <li>Create Navbar</li>
      <li>Create Icon Links</li>
      <li>Create Navbar dropdown</li>
      <li>Create footer</li>
      <li>Signin/out in Navbar</li>
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

const NavBar = () => (
  <nav className="rounded border-gray-200 bg-teal-500 px-2 py-2.5 dark:bg-gray-900 sm:px-4">
    <div className="container mx-auto flex flex-wrap items-center justify-between">
      <span className="self-center whitespace-nowrap text-2xl font-light tracking-wider text-white">
        <Link href="/">Exemplum</Link>
      </span>
      <div className="hidden w-full md:block md:w-auto">
        <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-teal-500 md:text-sm md:font-medium md:dark:bg-gray-900">
          <li>
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex w-full items-center justify-between border-b border-gray-100 p-2 font-medium text-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white md:w-auto md:border-0 md:hover:bg-slate-900/5 md:dark:hover:bg-transparent"
            >
              SUPPORT{" "}
              <svg
                className="ml-1 h-4 w-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              id="dropdownNavbar"
              className="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white font-normal shadow dark:divide-gray-600 dark:bg-gray-700"
            >
              <ul
                className="py-1 text-sm text-white dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                <li className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  Community Support
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          </li>
        </ul>
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
