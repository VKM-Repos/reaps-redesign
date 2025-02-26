import FilterGlobal from "@/components/custom/FilterGlobal";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import { useGET } from "@/hooks/useGET.hook";
import { TransactionItem } from "@/types/transaction";
import TransactionTable from "./table";
import Loader from "@/components/custom/Loader";

const InstitutionTransactions = () => {
  const { data: transactionsData, isPending } = useGET({
    queryKey: ["my-transactions"],
    url: `transactions?sort_by=created_at&sort_direction=desc&skip=0&limit=100`,
    enabled: true,
  });

  const transactions: TransactionItem[] = transactionsData?.items || [];
  return (
    <TransitionElement>
      <div className="flex flex-col gap-y-[4rem] p-8">
        <TableWrapper
          search={<SearchGlobal />}
          filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
          actions={null}
        >
          {isPending ? <Loader /> : <TransactionTable data={transactions} />}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
};

export default InstitutionTransactions;
