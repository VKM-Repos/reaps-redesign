/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { CustomCell } from "@/components/custom/CustomTable";
import { Badge } from "@/components/ui/badge";
import { statusColorMap } from "@/lib/utils";
import Action from "./action";

const columns: Array<ColumnDef<any>> = [
  {
    header: () => (
      <CustomCell value={"Title"} className="font-bold w-full min-w-[10rem] " />
    ),
    accessorKey: "research_title",
    cell: (info) => (
      <CustomCell
        value={info?.getValue()}
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
        value={"Submission"}
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
    header: () => (
      <CustomCell
        value={"Status"}
        className="font-bold w-full min-w-[8.75rem]"
      />
    ),
    accessorKey: "status",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <span className="text-left min-w-[8.75rem] flex justify-left !text-xs">
          <Badge
            style={{
              color: statusColorMap[item.status]?.text || "#000000",
              backgroundColor: statusColorMap[item.status]?.bg || "#192C8A",
            }}
            className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem]"
          >
            <div
              style={{
                backgroundColor: statusColorMap[item.status]?.text || "#192C8A",
              }}
              className="w-[5px] h-[5px] rounded-full"
            ></div>
            {item.status}
          </Badge>
        </span>
      );
    },
  },

  {
    accessorKey: "custom",
    header: () => <CustomCell value="" className="w-full md:max-w-[1rem]" />,
    meta: { cellType: "custom" },
    cell: ({ row }) => {
      const item = row.original.all;
      console.log(item);

      return (
        <CustomCell
          value={<Action />}
          className="flex justify-center items-center justify-self-end w-full md:max-w-[1rem]"
        />
      );
    },
  },
];

export default columns;
