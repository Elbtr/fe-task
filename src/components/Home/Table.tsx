import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import image from "../../assets/profile.jpg";
import HandleInput from "./HandleInput";

interface DataT {
  hero_avatar: string;
  hero_id: number;
  hero_name: string;
  hero_role: string;
  hero_specially: string;
}

const columnHelper = createColumnHelper<DataT>();

const columns = [
  columnHelper.accessor("hero_id", {
    header: "No.",
    cell: (info) => <span>{`${info.row.index + 1}.`}</span>,
  }),
  columnHelper.accessor((row) => row.hero_name, {
    header: "Hero Name",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.hero_avatar, {
    header: "Hero Avatar",
    cell: (info) => (
      <img
        src={image}
        alt={`Avatar for ${info.row.original.hero_name}`}
        style={{
          width: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.hero_role, {
    header: "Hero Role",
    cell: (info) => <b>{info.renderValue()}</b>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.hero_specially, {
    header: "Hero Specially",
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
];

const Table = (props: { listHero: DataT[] }) => {
  const [data] = useState(() => props.listHero);
  const [globalFilter, setGlobalFilter] = useState("");
  //   console.log(props.listHero);
  //   const table = useReactTable({
  //     data,
  //     columns,
  //     getCoreRowModel: getCoreRowModel(),
  //   });

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  //   console.log(data);

  return (
    <>
      <h1 className="mb-3 text-[24px]">
        CREATE TABLE WITH REACT-TABLE TANSTACK
      </h1>
      <HandleInput
        onChange={(value) => setGlobalFilter(String(value))}
        initValue={globalFilter ?? ""}
        props
      />
      <section className="w-full">
        <table className="w-full border-gray-700 border text-left">
          <thead className="bg-indigo-500">
            {table.getHeaderGroups().map((getHeaderGroup) => (
              <tr key={getHeaderGroup.id}>
                {getHeaderGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-4 py-2">
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
            {table.getRowModel().rows.map((rowModel, index) => (
              <tr
                key={rowModel.id}
                className={index % 2 === 0 ? "bg-slate-600" : "bg-slate-700"}
              >
                {rowModel.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagnation */}
        <div className="flex items-center justify-end mt-2 gap-3">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
            className="p-1 border border-x-gray-50 rounded-lg text-white  disabled:opacity-30"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-x-gray-50 rounded-lg text-white disabled:opacity-30"
          >
            {">"}
          </button>
          <div className="flex gap-2">
            <h3>Page </h3>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </div>
        </div>
      </section>
    </>
  );
};

export default Table;
