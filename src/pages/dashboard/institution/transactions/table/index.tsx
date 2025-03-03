import CustomTable from "@/components/custom/CustomTable";
import EmptyTransactions from "../empty-transactions";
import columns from "./columns";
// import { TransactionItem } from "@/types/transaction";
import { useGET } from "@/hooks/useGET.hook";
import manualTransactionTableColumns from "./manual-transaction-table-columns";

type Props = {
  paymentConfigType: string;
};
const TransactionTable = ({ paymentConfigType }: Props) => {
  const { data: manualtransactions } = useGET({
    queryKey: ["MANUAL_TRANSACTIONS_BY_CONTEXT"],
    url: "manual-transactions/by-context",
    enabled: paymentConfigType === "manual",
  });
  const { data: onlinetransactions } = useGET({
    queryKey: ["ONLINE_TRANSACTIONS"],
    url: "transactions",
    enabled: paymentConfigType === "online",
  });
  const transformItems = (items: any): any => {
    if (!Array.isArray(items)) return [];

    return items.map((item: any) => ({
      id: item?.id,
      research_title: item?.request?.research_title,
      fullName: `${item?.request?.user?.first_name} ${item?.request?.user?.last_name}`,
      email: item?.request?.user?.email,
      created_at: item?.created_at,
      status: item?.status,
      evidence_of_payment: item?.evidence_of_payment,
    }));
  };

  const tableData = transformItems(manualtransactions);

  return (
    <div className="w-full">
      {paymentConfigType ? (
        <CustomTable
          data={paymentConfigType === "manual" ? tableData : onlinetransactions}
          columns={
            paymentConfigType === "manual"
              ? manualTransactionTableColumns
              : columns
          }
        />
      ) : (
        <EmptyTransactions />
      )}
    </div>
  );
};

export default TransactionTable;
