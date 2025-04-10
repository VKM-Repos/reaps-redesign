import { TransitionElement } from "@/lib/transitions";
import InvoicesTable from "./table";
import TableWrapper from "@/components/custom/TableWrapper";
import SearchGlobal from "@/components/custom/SearchGlobal";
import FilterGlobal from "@/components/custom/FilterGlobal";
import ArrowRight from '@/assets/arrow-right-02.svg'
import { useNavigate } from "react-router-dom";

export default function InstitutionInvoices() {
    const navigate = useNavigate();

    return (
        <TransitionElement>
            <div className="flex flex-col gap-[1.25rem]">
                <button onClick={() => {navigate(`/institution/finance-overview`)}} className="flex gap-2 items-center text-primary">
                    <img src={ArrowRight} alt="Back button icon" />
                    <span className="font-semibold text-[1.375rem]">Invoices</span>
                </button>
                <TableWrapper
                    search={<SearchGlobal />}
                    filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
                    actions={null}
                    >
                    <InvoicesTable />
                </TableWrapper>
            </div>
        </TransitionElement>
    )
}