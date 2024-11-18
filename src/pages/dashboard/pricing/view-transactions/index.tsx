import { Badge } from "@/components/ui/badge";
import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { useTransactionStore } from "@/store/TransactionStore";
import { useEffect } from "react";
import TransactionDetails from "./TransactionDetails";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CustomTable, { CustomCell, ColumnSetup } from "@/components/custom/CustomTable";

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
    const isMobile = useMediaQuery({query: '(max-width: 767px)'});
  
    const handleFunc = () => {
        setShowTransactions(false);
    }

    useEffect(() => {
        setTransactions(); 
      }, [setTransactions]);
    
    const columnData: ColumnSetup<any>[]= [
        {
            header: () => <CustomCell value="References" className="text-[#454747] min-w-[12.5rem] font-semibold text-left text-xl" />,
            accessorKey: "reference",
            cell: (info) => <CustomCell value={info.getValue()} className="w-full min-w-[12.5rem] text-[#868687] text-sm text-left font-normal" />
        },
        {
            header: () => <CustomCell value="Request ID" className="text-[#454747] w-full min-w-[9.5rem] font-semibold text-lg flex items-center text-xl" />,
            accessorKey: "id",
            cell: (info) => <CustomCell value={info.getValue()} className="flex items-center w-full min-w-[9.5rem] text-[#868687] text-sm font-normal" />
        },
        {
            header: () => <CustomCell value="Status" className="text-[#454747] w-full min-w-[7rem] font-semibold text-lg flex items-center text-xl"/>,
            accessorKey: "status",
            meta: { cellType: "custom" },
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex items-center w-full min-w-[7rem] font-normal">
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
                    </div>
                  );
            },
        },
        {
            header: () => <CustomCell value={"Date"} className="text-[#454747] w-full min-w-[10rem] font-semibold text-lg flex items-center text-xl"/>,
            accessorKey: "date",
            meta: { cellType: "custom" },
            cell: ({ row }) => {
                const item = row.original;
               
                return (
                    <div className="flex items-center text-[#868687] text-sm w-full min-w-[10rem] font-normal">{item.date} <span>&nbsp;|&nbsp;</span> {item.time}</div>
                )
            },
        },
        {
            header: () => <CustomCell value="Amount" className="text-[#454747] font-semibold text-lg text-xl flex items-center justify-center w-[6rem]" />,
            accessorKey: "amount",
            cell: (info) => <CustomCell value={info.getValue()} className="flex items-center justify-center text-[#868687] text-sm font-normal w-[6rem]" />
        },
        {
            accessorKey: "custom",
            header: () => <CustomCell value="" className="w-full md:max-w-[3rem] flex items-start" />,
            meta: { cellType: "custom" },
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex items-center justify-center min-w-[6rem]">
                    {isMobile ?
                    <Sheet>
                        <SheetTrigger className="text-sm text-[#192C8A]">
                            View
                        </SheetTrigger>
                        <TransactionDetails transaction={item} />
                    </Sheet>
                    :
                    <Dialog modal={false}>
                        <DialogTrigger className="text-sm text-[#192C8A]">
                            View
                        </DialogTrigger>
                        <TransactionDetails transaction={item} />
                    </Dialog>}
                </div>
                )
                
            }

        }
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
        <CustomTable columns={columnData} data={transactions} customTableClassName="!pb-4" customRowClassName="px-5 !py-3 rounded-none"/> 
    </div>
    )
}