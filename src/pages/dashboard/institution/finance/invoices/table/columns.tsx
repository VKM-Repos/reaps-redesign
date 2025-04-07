import { CustomCell } from "@/components/custom/CustomTable";
import StatusPill from "@/components/custom/StatusPill";
import { ColumnDef } from "@tanstack/react-table";
import ViewInvoice from "../view-invoice";

export const columns: ColumnDef<any>[] = [
    {
        header:  () =>  (
        <CustomCell
            value={"Invoice #"}
            className="w-full text-left text-[#333740]"
        />
        ),
        accessorKey: "invoice_number",
        minSize: 400,
        maxSize: 500,
        cell: ({ row }) => {
          const invoice_number = row.original.invoice_number;
          return (
            <div
              className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-[#333740]"
              title={invoice_number}
            >
              {invoice_number}
            </div>
          );
        },
      },
    {
            header:  () =>  (
            <CustomCell
                value={"Invoice Date"}
                className="w-full text-left text-[#333740]"
            />
            ),
            accessorKey: "invoice_date",
            minSize: 400,
            maxSize: 500,
            cell: ({ row }) => {
              const invoice_date = row.original.invoice_date;

              return (
                <div
                  className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-[#333740]"
                  title={invoice_date}
                >
                  {invoice_date}
                </div>
              );
            },
          },
          {
            header:  () =>  (
            <CustomCell
                value={"Due Date"}
                className="w-full text-left text-[#333740]"
            />
            ),
            accessorKey: "due_date",
            minSize: 400,
            maxSize: 500,
            cell: ({ row }) => {

              return (
                <div
                  className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-[#333740]"
                  title={row.original.due_date}
                >
                  {row.original.due_date}
                </div>
              );
            },
          },
      {
        header:  () =>  (
            <CustomCell
                value={"Amount"}
                className="w-full text-left min-w-[4rem] text-[#333740]"
            />
            ),
        accessorKey: "amount",
        cell: ({ row }) => {
          const amount = row.original.amount;
        //   const formattedAmount = new Intl.NumberFormat("en-NG", {
        //     style: "currency",
        //     currency: "NGN",
        //   }).format(amount);
    
          return <span className="text-[#333740]">{amount}</span>;
        },
      },
      {
        header: () =>  (
            <CustomCell
                value={"Status"}
                className="w-full text-left min-w-[5rem]"
            />
            ),
        accessorKey: "status",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center w-full min-w-[5rem] font-normal">
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
        cell: () => <ViewInvoice />,
      },
    
]