import { tableData } from "@/lib/helpers";
import TableRequests from "./components/table-requests";
import EmptyRequests from "./components/emptystate";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";

export default function Requests() {
    return (
    <div className="flex flex-col gap-[1.25rem] mb-20">
        <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
            <h1 className="text-[1.875rem] font-bold">Requests</h1>
            {tableData.length > 0 && <Button className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"><span><GoogleDoc /></span>Request Ethical Approval</Button>}
        </div>
        {tableData && tableData.length > 0 ?
            <TableRequests tableData={tableData} />
            :
            <EmptyRequests />
        }
    </div>
        
    )
}