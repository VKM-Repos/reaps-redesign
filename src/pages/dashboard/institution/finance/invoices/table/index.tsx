import CustomTable from "@/components/custom/CustomTable";
import { invoice_data } from "./data";
import { columns } from "./columns";
import EmptyTransactions from "../../../transactions/empty-transactions";

export default function InvoicesTable() {
    return (
        <div className="w-full">
            {invoice_data ?  <CustomTable data={invoice_data} columns={columns} /> : <EmptyTransactions />}
        </div>
    )
}