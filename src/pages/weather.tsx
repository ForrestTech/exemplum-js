import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { withAuthRequired } from "@features/common/withAuth";
import { trpc } from "utils/trpc";
import { createColumnHelper } from "@tanstack/react-table";
import { Weather } from "server/trpc/router/weather";

import Layout from "@features/common/Components/Layout/Layout";
import LoadingWrapper from "@features/common/Components/LoadingWrapper/LoadingWrapper";
import Table from "@features/common/Components/Table/Table";

const columnHelper = createColumnHelper<Weather>();

const columns = [
  columnHelper.accessor((row) => row?.main, {
    id: "summary",
    header: () => "Summary",
  }),
  columnHelper.accessor((row) => row?.description, {
    id: "description",
    header: () => <span>Description</span>,
  }),
];

const Weather: NextPage = () => {
  const [lat, setLat] = useState<number>(54.978252);
  const [long, setLong] = useState<number>(-1.61778);
  const [tableData, setTableData] = useState<Weather[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  const {
    data: forecast,
    isLoading,
    error,
  } = trpc.weather.forecast.useQuery({
    lat: lat,
    lon: long,
  });

  useEffect(() => {
    if (forecast?.weather) {
      setTableData(forecast?.weather);
    }
  }, [forecast]);

  return (
    <>
      <Head>
        <title>Weather Forecast</title>
      </Head>
      <Layout>
        <div className="flex flex-col justify-center p-8">
          <h1 className="mb-8 text-4xl dark:text-white">Weather</h1>
          <p className="dark:text-white">
            This component demonstrates fetching data from a service and the use
            of the browser geolocation API.
          </p>
          <h2 className="py-4 text-lg font-bold dark:text-white">Forecast</h2>
          <LoadingWrapper data={forecast} isLoading={isLoading} error={error}>
            <dl className="pb-8 dark:text-white">
              <dt className="inline pr-2 font-bold">Location:</dt>
              <dd className="inline pr-2">{forecast?.name}</dd>
              <dt className="inline pr-2 font-bold">Temperature:</dt>
              <dd className="inline pr-2">{forecast?.main?.temp}</dd>
            </dl>
          </LoadingWrapper>
          <Table data={tableData} columns={columns} />
        </div>
      </Layout>
    </>
  );
};

export default withAuthRequired(Weather);
