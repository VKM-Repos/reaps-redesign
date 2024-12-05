import CustomTable from "@/components/custom/CustomTable";
import columns from "./columns";
import EmptyTransactions from "../empty-transactions";
import { TransactionItem } from "@/types/transaction";

type Props = {
  data: TransactionItem[];
};

const TransactionTable = ({ data }: Props) => {
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <CustomTable data={data} columns={columns} />
      ) : (
        <EmptyTransactions />
      )}
    </div>
  );
};

export default TransactionTable;
