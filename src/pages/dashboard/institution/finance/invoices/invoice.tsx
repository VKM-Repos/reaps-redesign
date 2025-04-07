import { TransitionElement } from "@/lib/transitions";
import InvoicesTable from "./table";
import TableWrapper from "@/components/custom/TableWrapper";
import SearchGlobal from "@/components/custom/SearchGlobal";
import FilterGlobal from "@/components/custom/FilterGlobal";
import ArrowRight from '@/assets/arrow-right-02.svg'
import { Link } from "react-router-dom";

export default function InstitutionInvoices() {
 
    return (
        <TransitionElement>
             <section>
                <div className="flex flex-col gap-[1.25rem]">
                    <p className="flex gap-2 items-center text-primary">
                        <Link to='institution/finance-overview'><img src={ArrowRight} alt="Back button icon" /></Link>
                        <span className="font-semibold text-[1.375rem]">Invoices</span>
                    </p>
                    <TableWrapper
                    search={<SearchGlobal />}
                    filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
                    actions={null}
                    >
                        <InvoicesTable />
                    </TableWrapper>
                </div>
                </section>
        </TransitionElement>
    )
}