import { useMediaQuery } from "react-responsive";
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

    const isMobile = useMediaQuery({ query: '(max-width: 767px)'})

    return (
        <div className={`w-full flex flex-col mb-[6rem] ${isMobile && "overflow-x-scroll"} gap-2 
        [&::-webkit-scrollbar]:h-2 
        [&::-webkit-scrollbar-track]:rounded-full 
        [&::-webkit-scrollbar-track]:bg-gray-10110
        [&::-webkit-scrollbar-thumb]:bg-[#868687]`}>
            <Table className="w-full border ">
                <TableHeader>
                    <TableRow className="font-bold w-full flex items-center justify-between !border-b p-6">
                    {columns.map((column, index) => (
                        <TableHead key={index} className={`font-bold text-left w-full !h-auto ${column.headerClass || ''}`}>
                            {column.header }
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
            {isMobile && <div className="w-full">&nbsp;</div>}
        </div>
    )
}
