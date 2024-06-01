import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { IListProductServer } from "../definitions/api";
import { useState } from "react";
import { format } from "date-fns";
import Search from "./Search";
import { useSaveUpdatedItem } from "../lib/action";
import TableCell from "./TableCell";
import EditCell from "./EditCell";

const columnHelper = createColumnHelper<IListProductServer>();
const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <strong>{info.getValue()}</strong>,
    header: "ID",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("productName", {
    cell: (info) => info.getValue(),
    header: "Product Name",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("customerName", {
    cell: (info) => info.getValue(),
    header: "Customer Name",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("orderDate", {
    cell: (info) => format(new Date(info.getValue()), "dd-MMM-yyyy"),
    header: "Order Date",
    footer: (info) => new Date(info.column.id).toDateString(),
  }),
  columnHelper.accessor("quantity", {
    cell: (info) => <TableCell {...info} />,
    header: "Quantity",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("totalAmount", {
    cell: (info) => info.getValue(),
    header: "Amount",
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    cell: (info) => {
      return (
        Number(info.row.original.totalAmount) *
        parseFloat(info.row.original.quantity)
      );
    },
    header: "Total Amount",
  }),
  columnHelper.display({
    cell: (info) => <EditCell {...info} />,
    header: "Actions",
  }),
];

function Table({ data }: { data: IListProductServer[] | undefined }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [editedRows, setEditedRows] = useState({});
  const [clientData, setClientData] = useState(() => (data ? data : []));

  const [globalFilter, setGlobalFilter] = useState("");
  const { mutate } = useSaveUpdatedItem();

  console.log("d");

  const table = useReactTable({
    data: clientData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setClientData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      revertData: (rowIndex: number) => {
        if (!data?.length) return;
        setClientData((old) =>
          old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
        );
      },
      saveData: (row: IListProductServer) => {
        mutate(row);
      },
    },
    state: {
      pagination,
      globalFilter,
    },
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center mb-4">
        <Search
          onChange={(value) => setGlobalFilter(String(value))}
          value={globalFilter}
        />
      </div>
      <div className="flex flex-col max-h-[75dvh] min-h-[70dvh] overflow-y-scroll border-2 rounded-md mx-6">
        <table className="table table-zebra table-pin-rows">
          <thead>
            {table.getHeaderGroups().map((header) => (
              <tr key={header.id}>
                {header.headers.map((item) => (
                  <th key={item.id}>
                    {item.isPlaceholder
                      ? null
                      : flexRender(
                          item.column.columnDef.header,
                          item.getContext()
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {table.getPageCount() ? null : (
          <div className="h-full flex-1 grid place-items-center">
            <p>No data found</p>
          </div>
        )}
      </div>

      <div className="flex gap-16 justify-center mt-4">
        <div className="join">
          {Array.from(Array(table.getPageCount()).keys()).map((item) => (
            <button
              key={item}
              className={`join-item btn ${
                table.getState().pagination.pageIndex + 1 === item + 1
                  ? "btn-active"
                  : ""
              }`}
              onClick={() => {
                table.setPageIndex(item);
              }}
            >
              {item + 1}
            </button>
          ))}
        </div>
        <div>
          <select
            className="select select-primary w-full max-w-32"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Table;
