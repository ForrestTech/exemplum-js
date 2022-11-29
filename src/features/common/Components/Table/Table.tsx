import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableConfigProps {
  displayFooter?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, string>[];
  config?: TableConfigProps | undefined;
}

const getDefaultTableConfig = (): TableConfigProps => {
  return {
    displayFooter: false,
  };
};

const Table = <T,>({ data, columns, config }: TableProps<T>) => {
  const tableConfig = { ...getDefaultTableConfig(), ...config };

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {data && table && (
        <table className="w-full border-collapse border-spacing-2 border border-slate-400 text-sm dark:border-dark-500">
          <thead className="bg-slate-50 dark:bg-dark-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="w-1/2 border border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-dark-600 dark:text-dark-200"
                  >
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
                  <td
                    key={cell.id}
                    className="border border-slate-300 p-4 text-slate-500 dark:border-dark-700 dark:text-dark-400"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {tableConfig.displayFooter && (
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
          )}
        </table>
      )}
    </>
  );
};

export default Table;
