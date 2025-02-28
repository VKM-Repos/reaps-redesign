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
  getSortedRowModel,
} from "@tanstack/react-table";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import ArrowLeftDouble from "@/assets/arrow-left-doube.svg";
import ArrowRightDouble from "@/assets/arrow-right-double.svg";

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
      sorting: [{ id: "created_at", desc: true }],
      pagination: { pageIndex: 0, pageSize: 6 },
    },
    onGlobalFilterChange: setLocalSearch ?? setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
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
              disabled={!table.getCanPreviousPage}
              onClick={() => table.previousPage()}
            >
              <img src={ArrowLeftDouble} />
            </button>
            <ul className="flex gap-1 items-center font-medium">
              {Array.from({ length: table.getPageCount() }, (_, index) => {
                const currentPage = table.getState().pagination.pageIndex;
                const totalPages = table.getPageCount();
                if (index === 0 ||
                  index === totalPages - 1 ||
                  Math.abs(index - currentPage) <= 1
                 ) {
                  return (
                    <li key={index}>
                  <button
                    key={index}
                    className={`rounded-full w-[3rem] h-[3rem] flex items-center justify-center ${
                      currentPage === index
                        ? "text-[#FFFFFF] bg-[#051467]"
                        : "text-[#20293A] hover:bg-[#14155E14]"
                    }`}
                    onClick={() => table.setPageIndex(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              )}
              else if (
                (index === currentPage - 2 || index === currentPage + 2) &&
                Math.abs(index - currentPage) > 1
              ){
                return (
                  <li key={index} className="text-[#20293A]">
                    ...
                  </li>
                );
              }
              return null;
            })}
            </ul>

            <button
              className="bg-[#14155E14] hover:bg-[#14155E33] rounded-full w-[3rem] h-[3rem] flex items-center justify-center"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <img src={ArrowRightDouble} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
