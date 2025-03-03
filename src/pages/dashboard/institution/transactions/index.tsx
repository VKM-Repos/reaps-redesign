import FilterGlobal from "@/components/custom/FilterGlobal";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import { useGET } from "@/hooks/useGET.hook";
import TransactionTable from "./table";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";

const InstitutionTransactions = () => {
  const { data: paymentConfigs, isPending } = useGET({
    queryKey: ["PAYMENT_CONFIG_BY_CONTEXT"],
    url: "payment-configs-by-context",
  });

  // const transactions: TransactionItem[] = transactionsData?.items || [];
  return (
    <TransitionElement>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle title="Transactions" actions={null} />
        <TableWrapper
          search={<SearchGlobal />}
          filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
          actions={null}
        >
          {isPending ? (
            <Loader />
          ) : (
            <TransactionTable
              paymentConfigType={paymentConfigs?.payment_type}
            />
          )}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
};

export default InstitutionTransactions;
