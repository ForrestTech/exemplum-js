import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const mutation = trpc.example.createExample.useMutation();

  const handleCreateExample = async () => {
    const name = "John Doe";
    mutation.mutate({ name });
  };

  return (
    <>
      <Head>
        <title>Exemplum JS</title>
        <meta name="description" content="Get off to a good start. Exemplum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Exemplum
        </h1>
        <div>
          <button onClick={handleCreateExample} disabled={mutation.isLoading}>
            Create Example
          </button>
          <h2>Tasks</h2>
          <ul>
            <li>Review setting up t3 app</li>
            <li>
              Fix database integration
              (https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale)
            </li>
            <li>Create Basic Page Layout</li>
            <li>Create footer</li>
            <li>Create Navbar</li>
            <li>Signin/out in Navbar</li>
            <li>Add Main logo</li>
            <li>Add Main Text and buttons</li>
            <li>Add side menu</li>
            <li>Authentication on pages</li>
            <li>Weather forecast endpoint</li>
            <li>Weather forecast page</li>
            <li>
              Get preview working
              https://vercel.com/docs/concepts/git/vercel-for-github Pull
              request feedback
            </li>
            <li>Get production working</li>
            <li>Task list API</li>
            <li>Task list UI</li>
            <li>Log rocket integration</li>
            <li>Toast notification integration</li>
            <li>React table integration</li>
            <li>Ably integration</li>
            <li>Growthbook integration</li>
            <li>Schedule Task Solution</li>
            <li>SaaS messaging functions</li>
          </ul>
        </div>
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
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

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
