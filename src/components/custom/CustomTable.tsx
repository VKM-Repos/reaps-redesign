import { useMediaQuery } from "react-responsive";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import ArrowLeftDouble from "@/assets/arrow-left-doube.svg";
import ArrowRightDouble from "@/assets/arrow-right-double.svg";
import { useState } from "react";

export const CustomCell = ({
  value,
  className,
}: {
  value: any;
  className: string;
}) => (
  <div title={value} className={className}>
    {value}
  </div>
);

const EmptyState = () => (
  <div className="flex h-full w-full items-center justify-center p-4">
    No data available.
  </div>
);

export type ColumnSetup<T> = ColumnDef<T, any> & {};
// no need for custom render

type CustomTableProps<T> = {
  columns: ColumnDef<T>[]; // Define columns using ColumnDef
  data: T[]; // Table data
  localSearch?: string;
  setLocalSearch?: (localSearch: string) => void;
  customTableClassName?: string;
  customRowClassName?: string;
  customHeaderRowClassName?: string;
};

export default function CustomTable({
  columns,
  data,
  localSearch,
  setLocalSearch,
  customTableClassName,
  customHeaderRowClassName,
  customRowClassName,
}: CustomTableProps<any>) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const { globalFilter, setGlobalFilter, columnFilters } = useGlobalFilter();

  const table = useReactTable({
    columns,
    data,
    state: {
      globalFilter: localSearch ?? globalFilter,
      columnFilters: columnFilters,
    },
    initialState: {
      pagination: { pageIndex: 0, pageSize: 6 },
    },
    onGlobalFilterChange: setLocalSearch ?? setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  // calculate the total number of entries,
  // number of pages depending on the data size,
  // the average of both against each other
  // set all page indices
  const total_entries = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.getState().pagination;
  const page_number = Math.ceil(total_entries / pageSize);
  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, total_entries);
  const [visibleStart, setVisibleStart] = useState(0);

  const allPages = Array.from({ length: page_number }, (_, i) => i);
  const visible_pages =
    page_number <= 5
      ? allPages // Show all if fewer than max pages
      : [
          ...allPages.slice(0, 2), // First two
          ...(visibleStart > 2 ? ["..."] : []), // Ellipsis if middle pages are hidden
          ...allPages.slice(
            Math.max(visibleStart, 2),
            Math.min(visibleStart + 2, page_number - 2)
          ),
          ...(visibleStart + 2 < page_number - 2 ? ["..."] : []), // Ellipsis before last two
          ...allPages.slice(page_number - 2, page_number), // Last two
        ];

  const handleNextPages = () => {
    if (pageIndex < page_number - 1) {
      table.setPageIndex(pageIndex + 1);
      setVisibleStart(Math.min(visibleStart + 2, page_number - 2));
    }
  };

  const handlePreviousPages = () => {
    if (pageIndex > 0) {
      table.setPageIndex(pageIndex - 1);
      setVisibleStart(Math.max(visibleStart - 2, 0));
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 mb-[6rem] ">
      <div
        className={`flex w-full flex-col ${
          isMobile && "overflow-x-scroll"
        } [&::-webkit-scrollbar-track]:bg-gray-10110 
        gap-2 
        [&::-webkit-scrollbar-thumb]:bg-[#868687] 
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar]:h-2`}
      >
        <Table className={`w-full border ${customTableClassName}`}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={`flex gap-10 w-full items-center justify-between !border-b p-6 font-bold ${customHeaderRowClassName}`}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`!h-auto w-full text-left font-bold`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}{" "}
                    {/* Render the header content */}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`flex gap-10 items-center rounded-3xl !border-none !px-6 !py-4 hover:bg-[#14155E14] ${customRowClassName}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {isMobile && <div className="w-full">&nbsp;</div>}
      </div>

      {/* Pagination component */}
      {page_number > 1 && (
        <div className="py-3 px-3 md:px-6 flex justify-between items-center">
          <div>
            <p className="text-[#4A5567] hidden md:block text-sm">
              Showing {start} to {end} of {total_entries} entries.
            </p>
          </div>
          <div className="flex gap-[0.625rem] items-center">
            <button
              className="bg-[#14155E14] hover:bg-[#14155E33] rounded-full w-[3rem] h-[3rem] flex items-center justify-center"
              disabled={pageIndex === 0}
              onClick={() => handlePreviousPages()}
            >
              <img src={ArrowLeftDouble} />
            </button>
            {/* Page Numbers */}
            <div className="flex gap-1 items-center font-medium">
              {visible_pages.map((page: any, index) =>
                page === "..." ? (
                  <span key={index} className="text-[#20293A]">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    className={`rounded-full w-[3rem] h-[3rem] flex items-center justify-center ${
                      pageIndex === page
                        ? "text-[#FFFFFF] bg-[#051467]"
                        : "text-[#20293A] hover:bg-[#14155E14]"
                    }`}
                    onClick={() => table.setPageIndex(page)}
                  >
                    {page + 1}
                  </button>
                )
              )}
            </div>

            <button
              className="bg-[#14155E14] hover:bg-[#14155E33] rounded-full w-[3rem] h-[3rem] flex items-center justify-center"
              disabled={pageIndex >= page_number - 1}
              onClick={() => handleNextPages()}
            >
              <img src={ArrowRightDouble} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
