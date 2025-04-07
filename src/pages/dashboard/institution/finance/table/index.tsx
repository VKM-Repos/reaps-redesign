import CustomTable from "@/components/custom/CustomTable";
import { payments_data } from "./data";
import { columns } from "./columns";
import EmptyTransactions from "../../transactions/empty-transactions";

export default function InstitutionPaymentsTable() {
    return (
        <div className="w-full">
            {payments_data ?  <CustomTable data={payments_data} columns={columns} /> : <EmptyTransactions />}
           
        </div>
    )
}