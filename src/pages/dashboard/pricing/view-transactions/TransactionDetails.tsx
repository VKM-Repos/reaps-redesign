import { DialogContent } from "@/components/ui/dialog"
import { statusColorMap } from "."
import { Badge } from "@/components/ui/badge"
import { SheetClose, SheetContent } from "@/components/ui/sheet"
import { useMediaQuery } from "react-responsive"
import HoverCancel from "@/components/custom/Icons/HoverCancel"

type TransactionDetailsProps = {
    transaction: {
        reference: string,
        id: string,
        date: string,
        time: string,
        status: string,
        amount: string
    }
}
   


export default function TransactionDetails({ transaction }: TransactionDetailsProps) {
    
    return (
      <TransactionWrapper>
        <div className="border-[#0E0F0C1F] border-b flex justify-between items-center text-[#040C21] w-full">
            <p className="pb-4 px-[1.125rem] font-semibold text-xl2">Transaction Details</p>
        </div>
        <div className="w-full flex flex-col gap-4">
            <div className="w-full max-w-[85%] md:max-w-[95%] mx-auto my-0 border border-[#0E0F0C1F] rounded-[1.25rem] flex flex-col gap-[3rem] justify-between p-5 md:p-[1.75rem]">
              <div className="flex flex-col gap-[3rem] md:flex-row md:gap-unset md:justify-between md:items-center">
                <div className="flex flex-col gap-2 text-sm justify-center text-[#515152] w-full">
                  <p className="text-bold font-semibold">Name of Researcher</p>
                  <p className="text-[#868687]">Academic - Undergraduates</p>
                </div>
                <div className="flex flex-col gap-2 text-sm justify-center text-[#515152] w-full">
                  <p className="text-bold font-semibold">Category</p>
                  <p className="text-[#868687]">Academic - Undergraduates</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm justify-center text-[#515152]">
                  <p className="text-bold font-semibold">Amount</p>
                  <p className="text-[#868687]">{transaction.amount}</p>
              </div>
                
            </div>
            <div className="w-full max-w-[85%] md:max-w-[95%] mx-auto my-0 border border-[#0E0F0C1F] text-[#868687] rounded-[1.25rem] flex flex-col justify-between gap-5 md:p-[1.75rem] p-5">
                <div className="font-semibold py-[1.75rem]">
                    <p>Details</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]"><p className="font-bold text-sm">Transaction Reference</p><p>{transaction.reference}</p></div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]"><p className="font-bold text-sm">Remita Reference</p><p>{transaction.reference}</p></div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]"><p className="font-bold text-sm">Request ID</p><p>{transaction.id}</p></div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]">
                  <p className="font-bold text-sm">Date of Transaction</p>
                  <p className="flex items-center gap-2">
                    <span>{transaction.date}</span>
                    <span>{transaction.time}</span>
                  </p>
                </div>
                <div className="flex gap-5 text-sm items-center text-[#515152]"><p className="font-bold">Status</p>
                    <Badge
                      style={{
                        color: statusColorMap[transaction.status]?.text || '#000000',
                        backgroundColor: statusColorMap[transaction.status]?.bg || '#192C8A',
                      }}
                      className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] font-[400]"
                    >
                      <div
                        style={{
                          backgroundColor: statusColorMap[transaction.status]?.text || '#192C8A',
                        }}
                        className="w-[5px] h-[5px] rounded-full "
                      ></div>
                      {transaction.status}
                    </Badge>
                </div>
            </div>
            <button className="min-w-[13.75rem] py-[0.313rem] px-3 rounded border border-[#14155E] text-[#0D1F00] bg-white fixed bottom-6 right-6">
              <p className="font-bold text-sm">Re-query transaction status</p>
            </button>
        </div>
    </TransactionWrapper>
        
    )
}

function TransactionWrapper({ children }: {children: React.ReactNode}) {
  const isMobile = useMediaQuery({query: '(max-width: 767px)'});

  return (
    <>
    {isMobile ? 
      <SheetContent className="w-full h-full  pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4">
         <SheetClose className="absolute right-6 top-6 !w-fit mx-auto py-0 px-0 ml-4 flex items-center justify-start opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
        {children}
      </SheetContent>
      :
      <DialogContent className="w-full max-w-[800px] h-full md:max-h-[650px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]">
        {children}
      </DialogContent>
    }
      </>

  )
}

