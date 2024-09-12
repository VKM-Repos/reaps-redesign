import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export type ColumnSetup<T> = {
    header?: string;
    accessor: keyof T;
    cellType?: 'text' | 'badge' | 'custom';
    customRender?: (data: T) => JSX.Element;
    headerClass?: string;
    cellClass?: string;
}

type CustomTableProps<T> = {
    columns: ColumnSetup<T>[]; // type of headers and data type
    data: T[]; // actual data
}




export default function CustomTable({ columns, data }: CustomTableProps<any>) {

    return (
        <>
            <Table className="w-full border overflow-scroll">
                <TableHeader>
                    <TableRow className="font-bold w-full flex items-center justify-between !border-b p-6">
                    {columns.map((column, index) => (
                        <TableHead key={index} className={`font-bold text-left w-full !h-auto ${column.headerClass || ''}`}>
                            {column.header}
                        </TableHead>
                    ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((rowData, rowIndex) => (
                       <TableRow key={rowIndex} className="flex items-center justify-between !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14]">
                       {columns.map((column, index) => (
                         <TableCell key={index} className={column.cellClass}>
                           {column.cellType === 'custom' && column.customRender
                             ? column.customRender(rowData)
                             : rowData[column.accessor]}
                         </TableCell>
                       ))}
                     </TableRow>
                    ))}
                </TableBody>
                
            </Table>
        </>
    )
}
