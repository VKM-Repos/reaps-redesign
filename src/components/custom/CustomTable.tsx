import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export type ColumnSetup<T> = {
    header?: string;
    accessor: keyof T;
    cellType?: 'text' | 'badge' | 'custom';
    customRender?: (data: any) => JSX.Element;
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
                    <TableRow className="font-bold w-full flex gap-6 justify-between !border-b p-6">
                    {columns.map((column, index) => (
                        <TableHead key={index} className={`font-bold text-left w-full !h-auto ${column.headerClass || ''}`}>
                            {column.header}
                        </TableHead>
                    ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((rowData, rowIndex) => (
                       <TableRow key={rowIndex} className="flex items-center justify-between gap-6 !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14] cursor-pointer">
                       {columns.map((column, index) => (
                         <TableCell key={index} className={column.cellClass}>
                           {column.cellType === 'custom' && column.customRender
                             ? column.customRender(rowData[column.accessor])
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


{/* <TableRow key={rowIndex} className="flex items-center justify-between gap-6 !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14] cursor-pointer">
{columns.map((column, colIndex) => {
    const cellData = rowData[column.accessor];

    return (
        <TableCell key={colIndex} className={column.cellClass}>
            {column.cellType === 'custom' && column.customRender
            ? column.customRender(rowData)
            : column.cellType === 'badge' 
            ? (Array.isArray(cellData) ? 
            (cellData).map((item: string, badgeIndex: number) => (
                <Badge
                key={badgeIndex}
                className={`${
                  statusColorMap[item].bg || 'bg-[#192C8A1A] text-black'
                } flex gap-1 items-center justify-center p-1.5 rounded-lg`}
              >
                {item}
              </Badge>
            )) : (
                <Badge
                    style={{
                        color: statusColorMap[cellData]?.text || '#000000',  
                        backgroundColor: statusColorMap[cellData]?.bg || '#192C8A',
                    }}
                    className="flex gap-2 items-center justify-center px-2 py-1 rounded-3xl max-w-fit text-xs"
                    >
                    <div
                        style={{
                        backgroundColor: statusColorMap[cellData]?.text || '#192C8A',  // Fallback background color
                        }}
                        className="w-[5px] h-[5px] rounded-full"
                    ></div>
                    {cellData}
                    </Badge>
            ))
        :
        cellData}
        </TableCell>
    )
})}
</TableRow> */}