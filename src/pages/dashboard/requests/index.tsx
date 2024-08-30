import { tableData } from "@/lib/helpers";
import TableRequests from "./table-requests";
import EmptyRequests from "./emptystate";

export default function Requests() {
    return (
    <div className="flex flex-col gap-[1.25rem] mb-20">
        <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
            <h1 className="text-[1.875rem] font-bold">Requests</h1>
        </div>
        {tableData && tableData.length > 0 ?
            <TableRequests tableData={tableData} />
            :
            <EmptyRequests />
        }
    </div>
        
    )
}