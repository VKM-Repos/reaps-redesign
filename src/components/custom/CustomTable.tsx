import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table"

// export type ColumnSetup<T> = {
//     header?: string;
//     accessor: keyof T;
//     cellType?: 'text' | 'badge' | 'custom';
//     customRender?: (data: T) => JSX.Element;
//     headerClass?: string;
//     cellClass?: string;
// }

export const CustomCell = ({ value, className }: { value: any, className: string }) => (
    <div className={className}>
      {value}
    </div>
  );


  export type ColumnSetup<T> = ColumnDef<T, any> & {
    meta?:{
        cellType?: 'text' | 'badge' | 'custom';  
        customRender?: (data: any) => JSX.Element; 
        headerClass?: string; 
        cellClass?: string;    
      }
  };
// no need for custom render

  type CustomTableProps<T> = {
    columns: ColumnSetup<T>[]; // Define columns using ColumnDef 
    data: T[]; // Table data
  };



export default function CustomTable({ columns, data }: CustomTableProps<any>) {

    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel()})

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
                    {/* <TableRow className="font-bold w-full flex items-center justify-between !border-b p-6">
                    {/* {columns.map((column, index) => (
                        <TableHead key={index} className={`font-bold text-left w-full !h-auto ${column.headerClass || ''}`}>
                            {column.header}
                        </TableHead>
                    ))} */}

                    {/* </TableRow> */} 
    
                <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="flex items-center !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14]">
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
                </TableBody>
                
            </Table>
        </>
    )
}
// {columns.map((column, index) => (
//     <TableCell key={index} className={column.meta?.cellClass}>
//       {column.meta?.cellType === 'custom' && column.meta?.customRender
//         ? column.meta?.customRender(rowData)
//         : rowData[column.meta?.accessor]}
//     </TableCell>
//   ))}
