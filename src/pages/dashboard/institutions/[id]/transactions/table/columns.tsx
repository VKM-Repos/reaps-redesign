import type { ColumnDef } from "@tanstack/react-table";
import TransactionDetails from "../transaction-details";
import { TransactionItem } from "@/types/transaction";
import StatusPill from "@/components/custom/StatusPill";

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
          <StatusPill status={item.status.toLocaleLowerCase()} />
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

export default columns;
