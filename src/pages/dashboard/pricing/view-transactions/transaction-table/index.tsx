import CustomTable from "@/components/custom/CustomTable";
// import columns from "./columns";
import EmptyTransactions from "../empty-transactions";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import TransactionDetails from "../TransactionDetails";
import { TransactionItem } from "@/types/transaction";
import { useGET } from "@/hooks/useGET.hook";
import { statusColorMap } from "./columns";

const TransactionTable = () => {
  const { data: transactionsData } = useGET({
    queryKey: ["my-transactions"],
    url: `transactions?sort_by=created_at&sort_direction=desc&skip=0&limit=100`,
    enabled: true,
  });

  const transactions: TransactionItem[] = transactionsData?.items || [];
  const columns: Array<ColumnDef<TransactionItem>> = [
    {
      header: "Reference",
      accessorKey: "transaction_reference",
      minSize: 200,
      maxSize: 300,
      cell: ({ row }) => {
        const reference = row.original.transaction_reference;
        return (
          <div
            className="truncate max-w-[4rem] overflow-hidden text-ellipsis whitespace-nowrap text-pretty"
            title={reference}
          >
            {reference}
          </div>
        );
      },
    },
    {
      header: "Request ID",
      accessorKey: "id",
      minSize: 200,
      maxSize: 300,
      cell: ({ row }) => {
        const requestId = row.original.id;
        return (
          <div
            className="truncate max-w-[4rem] overflow-hidden text-ellipsis whitespace-nowrap"
            title={requestId}
          >
            {requestId}
          </div>
        );
      },
    },

    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => {
        const item = row.original;
        const date = new Date(item.request.created_at);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div className="flex flex-col items-start text-[#868687] text-sm w-full min-w-[10rem] font-normal">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        );
      },
    },

    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        const amount = row.original.amount;
        const formattedAmount = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(amount);

        return <span>{formattedAmount}</span>;
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center w-full min-w-[7rem] font-normal">
            <Badge
              style={{
                color: statusColorMap[item.status]?.text || "#000000",
                backgroundColor: statusColorMap[item.status]?.bg || "#192C8A",
              }}
              className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] font-normal capitalize text-xs"
            >
              <div
                style={{
                  backgroundColor:
                    statusColorMap[item.status]?.text || "#192C8A",
                }}
                className="w-[5px] h-[5px] rounded-full "
              ></div>
              <span>{item.status.toLowerCase()}</span>
            </Badge>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      minSize: 50,
      maxSize: 100,
      cell: ({ row }) => <TransactionDetails id={row.id} />,
    },
  ];
  return (
    <div className="w-full">
      {transactions.length > 0 ? (
        <CustomTable data={transactions} columns={columns} />
      ) : (
        <EmptyTransactions />
      )}
    </div>
  );
};

export default TransactionTable;
