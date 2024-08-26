import { Badge } from "../ui/badge";
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

const statusColorMap: { [key: string]: string } = {
    Approved: 'bg-[#34A8534] text-[#254D4B]',
    Pending: 'bg-[#CDD0CD] text-[#333A33]',
    Declined: 'bg-[#E74848] text-[#BF1E2C]',
    Draft: 'bg-[#192C8A] text-[#040C21]',
    Review: 'bg-[#F2C374] text-[#452609]'
  };

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
                                              statusColorMap[item] || 'bg-[#192C8A1A] text-black'
                                            } flex gap-1 items-center justify-center hover:bg-opacity-75 p-1.5 rounded-lg`}
                                          >
                                            {item}
                                          </Badge>
                                        )) : (
                                            <Badge
                                            className={`${
                                              statusColorMap[cellData] || 'bg-[#192C8A1A] text-black'
                                            } flex gap-1 items-center justify-center hover:bg-opacity-75 px-2 py-1 rounded-3xl max-w-fit text-xs`}
                                          >
                                            {cellData}
                                          </Badge>
                                        ))
                                    :
                                    cellData}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table>
        </>
    )
}