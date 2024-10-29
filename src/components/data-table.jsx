/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { cn } from "../lib/utils";
import CustomPagination from "./custom-pagination";

const DataTable = ({
  columns,
  data,
  className,
  pageSize,
  setCurrentPage,
  currentPage,
  dataLength,
  handleClickRow,
  headerClassName
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={cn("bg-table rounded-lg", className)}>
      <div>
        <Table className="text-sm">
          <TableHeader className="overflow-hidden whitespace-nowrap font-extraLight text-ellipsis">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={cn(headerClassName, "font-normal text-xs md:text-base")}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="font-extralight text-sm">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleClickRow ? handleClickRow(row) : null}
                  className={`${handleClickRow && 'cursor-pointer'} text-xs md:text-base`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="capitalize font-extralight text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="text-center font-extralight w-full"
                >
                  <div className="w-fit mx-auto">
                    <img src="/no-file.png" alt="all file" className="w-[120px]" />
                    <p>No data found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalCount={dataLength}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DataTable;
