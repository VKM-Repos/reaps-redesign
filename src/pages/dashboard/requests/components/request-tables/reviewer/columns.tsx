import type { ColumnDef } from "@tanstack/react-table";
import { CustomCell } from "@/components/custom/CustomTable";
import ReviewerRequestSummary from "../../../view-requests/reviewer";

const columns: Array<ColumnDef<any>> = [
  {
    header: () => (
      <CustomCell value={"Title"} className="font-bold w-full min-w-[10rem] " />
    ),
    accessorKey: "research_title",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[10rem] truncate text-ellipsis whitespace-nowrap "
      />
    ),
  },
  {
    header: () => (
      <CustomCell
        value={"Applicant Name"}
        className="font-bold w-full min-w-[10rem] "
      />
    ),
    accessorKey: "fullName",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[10rem] whitespace-nowrap "
      />
    ),
  },
  {
    header: () => (
      <CustomCell
        value={"Applicant Email"}
        className="font-bold w-full min-w-[10rem] "
      />
    ),
    accessorKey: "email",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[10rem] whitespace-nowrap "
      />
    ),
  },
  {
    header: () => (
      <CustomCell
        value={"Approved Date"}
        className="font-bold w-full min-w-[6rem]"
      />
    ),
    accessorKey: "created_at",
    cell: ({ row }) => {
      const item = row.original;
      const date = item.created_at ? new Date(item.created_at) : null;

      const isValidDate = date && !isNaN(date.getTime());

      const formattedDate = isValidDate ? date.toLocaleDateString() : "-";
      const formattedTime = isValidDate
        ? date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-";

      return (
        <div className="flex flex-col items-start text-sm w-full min-w-[6rem]">
          <CustomCell
            value={formattedDate}
            className="min-w-[10rem] w-full overflow-x-hidden"
          />
          <CustomCell
            value={formattedTime}
            className="min-w-[10rem] w-full overflow-x-hidden"
          />
        </div>
      );
    },
  },

  {
    header: () => <CustomCell value="" className="w-full md:max-w-[3rem]" />,
    accessorKey: "action",
    cell: ({ row }) => (
      <div className="flex place-content-center items-center gap-2">
        <CustomCell
          value={<ReviewerRequestSummary request={row.original.request} />}
          className="flex justify-center items-center w-full md:max-w-[3rem]"
        />
      </div>
    ),
  },
];

export default columns;
