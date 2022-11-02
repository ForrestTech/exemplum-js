import { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "@features/common/Layout/Layout";
import { withAuthRequired } from "@features/common/withAuth";
import { trpc } from "utils/trpc";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Weather } from "server/trpc/router/weather";

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

  const { data: forecast } = trpc.weather.forecast.useQuery({
    lat: lat,
    lon: long,
  });

  useEffect(() => {
    if (forecast?.weather) {
      setTableData(forecast?.weather);
    }
  }, [forecast]);

  const table = useReactTable<Weather>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Layout>
      <div className="flex flex-col justify-center p-8">
        <h1 className="mb-8 text-4xl dark:text-white">Weather</h1>
        <p className="dark:text-white">
          This component demonstrates fetching data from a service and the use
          of the browser geolocation API.
        </p>
        <h2 className="py-4 text-lg font-bold dark:text-white">Forecast</h2>
        {forecast && (
          <dl className="pb-8 dark:text-white">
            <dt className="inline pr-2 font-bold">Location:</dt>
            <dd className="inline pr-2">{forecast?.name}</dd>
            <dt className="inline pr-2 font-bold">Temperature:</dt>
            <dd className="inline pr-2">{forecast?.main?.temp}</dd>
          </dl>
        )}
        {tableData && table && (
          <table className="py-8 dark:text-white">
            <thead className="text-left">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default withAuthRequired(Weather);
