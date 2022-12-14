/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { Welcome } from "@features/common/Components/Welcome/Welcome";
import Layout from "@features/common/Components/Layout/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Exemplum JS - Get off to a good start</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center p-8">
          <Welcome />
        </div>
      </Layout>
    </>
  );
};

export default Home;
