import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ColumnDef, getCoreRowModel, useReactTable, flexRender, getFilteredRowModel } from "@tanstack/react-table"
import { useGlobalFilter } from "@/context/GlobalFilterContext";




export const CustomCell = ({ value, className }: { value: any, className: string }) => (
    <div className={className}>
      {value}
    </div>
  );

  const EmptyState = () => (
    <div className="flex h-full w-full items-center justify-center p-4">
        No data available.
    </div>
  )


  export type ColumnSetup<T> = ColumnDef<T, any> & {
  };
// no need for custom render

  type CustomTableProps<T> = {
    columns: ColumnDef<T>[]; // Define columns using ColumnDef 
    data: T[]; // Table data
  };





export default function CustomTable({ columns, data }: CustomTableProps<any>) {
    const {  globalFilter, setGlobalFilter, columnFilters } = useGlobalFilter();
  

    const table = useReactTable({ 
        columns, 
        data,  
        state: {
            globalFilter: globalFilter,
            columnFilters: columnFilters,
        },
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(), 
        getCoreRowModel: getCoreRowModel(),
    });
    


    return (
        <>
            <Table className="w-full border overflow-scroll">
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} className="font-bold w-full flex items-center justify-between !border-b p-6">
                            {headerGroup.headers.map(header => (
                                <TableHead
                                    key={header.id}
                                    className={`font-bold text-left w-full !h-auto`}
                                >
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())} {/* Render the header content */}
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
                    </TableRow>) : (
                        table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="flex items-center !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14]">
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                        </TableRow>
                    )))}                    
                </TableBody>
                
            </Table>

        </>
      
    )
}
