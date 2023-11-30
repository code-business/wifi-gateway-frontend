import Card from "components/card";
import React, { useEffect } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDeviceId } from "utils/redux";

type RowObj = {
  deviceName: string;
  deviceId: string;
  button: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tableData } = props;
  console.log({ tableData });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const defaultData = tableData;
  const columns = [
    columnHelper.accessor("deviceName", {
      id: "deviceName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DEVICE NAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("deviceId", {
      id: "deviceId",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DEVICE ID
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("button", {
      id: "button",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ACTION
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <button
            className="rounded-xl bg-blue-500 px-3 py-2 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200"
            onClick={() => {
              const deviceId = info.row.original.deviceId;
              dispatch(setDeviceId(deviceId));
              navigate("admin/timeline");
            }}
          >
            Timeline
          </button>
        </div>
      ),
    }),
  ];
  // eslint-disable-next-line
  const [data, setData] = React.useState(() => tableData);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    setData(tableData || []);
  }, [tableData]);

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Device List
        </div>
        {/* <CardMenu /> */}
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
