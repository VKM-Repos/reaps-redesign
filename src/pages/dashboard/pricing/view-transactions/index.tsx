// import CustomTable from "@/components/custom/CustomTable";
import { Badge } from "@/components/ui/badge";
import { ColumnSetup } from "@/lib/helpers";
import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { useTransactionStore } from "@/store/TransactionStore";
import { useEffect } from "react";
import TransactionDetails from "./TransactionDetails";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

type ViewTransactionsProps = {
    setShowTransactions: (value: boolean) => void;
}

export const statusColorMap: { [key: string]: { bg: string; text: string } } = {
    Failed: { bg: '#FC8D94', text: '#320104' },
    Success: { bg: '#80EF80', text: '#0E1A0E' },
    Pending: { bg: '#FFDEFF', text: '#410A70' },
  };



  
export default function ViewTransactions({ setShowTransactions }: ViewTransactionsProps) {
    const { data, setTransactions } = useTransactionStore();
    const { transactions } = data;
    const [ showDetails, setShowDetails ] = useState(false);
    const isMobile = useMediaQuery({query: '(max-width: 767px)'});
  
    
    
    const handleFunc = () => {
        setShowTransactions(false);
    }


    const handleRowClick = () => {
        setShowDetails(true);
    }

    useEffect(() => {
        setTransactions(); 
      }, [setTransactions]);
    
    const columnData: ColumnSetup<any>[]= [
        {
            header: "Reference",
            accessor: "reference",
            cellType: 'text',
            headerClass: " text-[#454747] min-w-[12.5rem] font-semibold text-left text-xl",
            cellClass: "w-full min-w-[12.5rem] text-[#868687] text-sm text-left font-normal"
        },
        {
            header: "Request ID",
            accessor: "id",
            cellType: 'text',
            headerClass: "text-[#454747] w-full min-w-[12.5rem] font-semibold text-lg flex items-center text-xl",
            cellClass: "flex items-center w-full min-w-[12.5rem] text-[#868687] text-sm font-normal"
        },
        {
            header: "Status",
            accessor: "status",
            cellType: 'custom',
            customRender: (item: any) => {
                return (
                    <>
                        <Badge
                          style={{
                            color: statusColorMap[item.status]?.text || '#000000',
                            backgroundColor: statusColorMap[item.status]?.bg || '#192C8A',
                          }}
                          className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] font-normal text-xs"
                        >
                          <div
                            style={{
                              backgroundColor: statusColorMap[item.status]?.text || '#192C8A',
                            }}
                            className="w-[5px] h-[5px] rounded-full "
                          ></div>
                          {item.status}
                        </Badge>
                    </>
                  );
            },
            headerClass: "text-[#454747] w-full min-w-[10rem] font-semibold text-lg flex items-center text-xl",
            cellClass: "flex items-center w-full min-w-[10rem] font-normal"
        },
        {
            header: "Date",
            accessor: "date",
            cellType: 'custom',
            customRender: (item: any) => {
               
                return (
                    <>{item.date} <span>&nbsp;|&nbsp;</span> {item.time}</>
                )
            },
            headerClass: "text-[#454747] w-full min-w-[10rem] font-semibold text-lg flex items-center text-xl",
            cellClass: "flex items-center text-[#868687] text-sm w-full min-w-[10rem] font-normal"
        },
        {
            header: "Amount",
            accessor: "amount",
            cellType: 'text',
            headerClass: "text-[#454747] font-semibold text-lg text-xl flex items-center justify-center max-w-[6rem]",
            cellClass: "flex items-center justify-center text-[#868687] text-sm font-normal max-w-[6rem]"
        },

    ]
    

    return (
        <div className="flex flex-col gap-[1.5rem] mb-20">
        <div className="flex flex-col gap-[1.25rem] mx-auto w-full">
            <div className="flex gap-3 items-center">
                <div onClick={handleFunc} className="p-2 rounded-full bg-[#14155E14] rotate-180 cursor-pointer"><ArrowLeft /></div>
                <h1 className="text-[1.875rem] font-bold">Your transactions</h1>
            </div>
            <p className="text-sm text-[#454745]">Here you can see the details of all the payments you have made , please not that you will only find the transaction history of only payments made online and not offline</p>
        </div>
        {/* <CustomTable columns={columnData} data={transactions} onRowClick={handleRowClick}/>  */}
        <div className={`w-full flex flex-col mb-[7rem] ${isMobile && "overflow-x-scroll"} gap-2 
        [&::-webkit-scrollbar]:h-2 
        [&::-webkit-scrollbar-track]:rounded-full 
        [&::-webkit-scrollbar-track]:bg-gray-10110
        [&::-webkit-scrollbar-thumb]:bg-[#868687]`}>
        <Table className="w-full border overflow-scroll">
                <TableHeader>
                    <TableRow className="font-bold w-full flex items-center justify-between !border-b p-6">
                    {columnData.map((column, index) => (
                        <TableHead key={index} className={`font-bold text-left w-full !h-auto ${column.headerClass || ''}`}>
                            {column.header}
                        </TableHead>
                    ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((rowData, rowIndex) => (
                    <>
                    {isMobile ?
                    <Sheet>
                        <SheetTrigger className="w-full">
                            <TableRow key={rowIndex} 
                            className="flex items-center justify-between !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14]"
                            onClick={() => handleRowClick()}>
                                {columnData.map((column, index) => (
                                    <TableCell key={index} className={column.cellClass}>
                                    {column.cellType === 'custom' && column.customRender ? column.customRender(rowData) :  (rowData as any)[column.accessor]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </SheetTrigger>
                        {showDetails && <TransactionDetails transaction={rowData}/>}
                    </Sheet>
                     : 
                     <Dialog>
                        <DialogTrigger className="w-full">
                            <TableRow key={rowIndex} 
                            className="flex items-center justify-between !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14]"
                            onClick={() => handleRowClick()}>
                                {columnData.map((column, index) => (
                                    <TableCell key={index} className={column.cellClass}>
                                    {column.cellType === 'custom' && column.customRender ? column.customRender(rowData) :  (rowData as any)[column.accessor]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </DialogTrigger>
                        {showDetails && <TransactionDetails transaction={rowData}/>}
                    </Dialog>
                    }
                    </>
                    ))}
                </TableBody>
                
            </Table>
            {isMobile && <div className="w-full">&nbsp;</div>}
        </div>
    </div>
    )
}