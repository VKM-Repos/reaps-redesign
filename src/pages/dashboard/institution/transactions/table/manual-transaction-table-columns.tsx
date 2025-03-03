import type { ColumnDef } from "@tanstack/react-table";
import type { ManualTransactionItem } from "@/types/transaction";
import StatusPill from "@/components/custom/StatusPill";
import ManualTransactionDetails from "../manual-transaction-details";

const manualTransactionTableColumns: Array<ColumnDef<ManualTransactionItem>> = [
  {
    header: "Applicant Name",
    accessorKey: "fullName",
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => {
      const fullName = row.original.fullName;
      return (
        <div className="w-[8rem] max-w-[8rem]" title={fullName}>
          {fullName}
        </div>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <div className="truncate max-w-[4rem] overflow-hidden text-ellipsis whitespace-nowrap">
          {email}
        </div>
      );
    },
  },

  {
    header: "Submission Date",
    accessorKey: "date",
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => {
      const item = row.original;
      const date = new Date(item.created_at);
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
    header: "Status",
    accessorKey: "status",
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center w-full min-w-[7rem] font-normal">
          <StatusPill
            status={item.status ? "Payment Confirmed" : "Payment Declined"}
          />
        </div>
      );
    },
  },
  {
    header: "",
    accessorKey: "evidence_of_payment",
    minSize: 50,
    maxSize: 100,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <ManualTransactionDetails
          id={item.id}
          evidence_of_payment={item?.evidence_of_payment}
          status={item.status}
        />
      );
    },
  },
];

export default manualTransactionTableColumns;
