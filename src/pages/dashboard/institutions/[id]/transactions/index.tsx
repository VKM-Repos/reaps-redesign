import FilterGlobal from "@/components/custom/FilterGlobal";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import { useGET } from "@/hooks/useGET.hook";
import { TransactionItem } from "@/types/transaction";
import TransactionTable from "./table";
import Loader from "@/components/custom/Loader";

const InstitutionTransactionsPage = () => {
  const { data: transactionsData, isPending } = useGET({
    queryKey: ["my-transactions"],
    url: `transactions?sort_by=created_at&sort_direction=desc&skip=0&limit=100`,
    enabled: true,
  });

  const transactions: TransactionItem[] = transactionsData?.items || [];
  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header title="Transactions" actions={null} />

          <TableWrapper
            search={<SearchGlobal />}
            filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
            actions={null}
          >
            {isPending ? <Loader /> : <TransactionTable data={transactions} />}
          </TableWrapper>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionTransactionsPage;
