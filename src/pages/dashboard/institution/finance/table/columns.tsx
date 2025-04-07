import { CustomCell } from "@/components/custom/CustomTable";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
    {
        header:  () =>  (
        <CustomCell
            value={"Reference"}
            className="w-full text-left min-w-[5.75rem] text-[#333740]"
        />
        ),
        accessorKey: "transaction_reference",
        minSize: 400,
        maxSize: 500,
        cell: ({ row }) => {
          const reference = row.original.transaction_reference;
          return (
            <div
              className="truncate min-w-[5.75rem] overflow-hidden text-ellipsis whitespace-nowrap text-[#333740]"
              title={reference}
            >
              {reference}
            </div>
          );
        },
      },
      {
        header: () =>  (
            <CustomCell
                value={"User Name"}
                className="w-full text-left max-w-fit text-[#333740]"
            />
            ),
        accessorKey: "user_name",
        cell: ({ row }) => {
          const user_name = row.original.user_name;
          return (
            <div
              className="truncate max-w-fit overflow-hidden text-ellipsis whitespace-nowrap text-[#333740]"
              title={user_name}
            >
              {user_name}
            </div>
          );
        },
      },
      {
        header: () =>  (
        <CustomCell
            value={"Request Title"}
            className="w-full text-left min-w-[6.75rem] text-[#333740]"
        />
        ),
        accessorKey: "request_title",
        cell: ({ row }) => {
          const request_title = row.original.request_title;
          return (
            <div
              className="truncate min-w-[6.75rem] overflow-hidden text-ellipsis whitespace-nowrap text-[#333740]"
              title={request_title}
            >
              {request_title}
            </div>
          );
        },
      },
      {
        header: () =>  (
            <CustomCell
                value={"Payment Category"}
                className="w-full text-left min-w-[5.75rem] text-[#333740]"
            />
            ),
        accessorKey: "payment_category",
        cell: ({ row }) => {
          return (
            <div
              className="truncate min-w-[5.75rem] overflow-hidden text-ellipsis whitespace-nowrap text-[#333740]"
              title={row.getValue('payment_category')}
            >
              {row.getValue('payment_category')}
            </div>
          );
        },
      },
      {
        header: () =>  (
        <CustomCell
            value={"Date & Time"}
            className="w-full text-left min-w-[5.75rem] text-[#333740]"
        />
        ),
        accessorKey: "date",
        minSize: 200,
        maxSize: 300,
        cell: ({ row }) => {
          const date = row.original.date;
          return (
            <div
              className="truncate min-w-[5.75rem] overflow-hidden text-ellipsis whitespace-nowrap text-pretty text-[#333740]"
              title={date}
            >
              {date}
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
    
      // {
      //   header: () =>  (
      //       <CustomCell
      //           value={"Status"}
      //           className="w-full text-left min-w-[5rem]"
      //       />
      //       ),
      //   accessorKey: "status",
      //   cell: ({ row }) => {
      //     const item = row.original;
      //     return (
      //       <div className="flex items-center w-full min-w-[5rem] font-normal">
      //         <StatusPill status={item.status.toLocaleLowerCase()} />
      //       </div>
      //     );
      //   },
      // },
]