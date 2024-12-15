import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CustomCell } from "@/components/custom/CustomTable";
import { RequestItems } from "@/types/requests";
import { statusColorMap } from "@/lib/utils";
import Actions from "./actions";

const columns: Array<ColumnDef<RequestItems>> = [
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
      <CustomCell value={"Expiry"} className="font-bold w-full min-w-[6rem]" />
    ),
    accessorKey: "expiration_date",
    cell: ({ row }) => {
      const item = row.original;
      const date = item.expiration_date ? new Date(item.expiration_date) : null;

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
            className="min-w-[6rem] w-full overflow-x-hidden"
          />
          <CustomCell
            value={formattedTime}
            className="min-w-[6rem] w-full overflow-x-hidden"
          />
        </div>
      );
    },
  },
  {
    header: () => (
      <CustomCell value={"Status"} className="font-bold w-full min-w-[7rem]" />
    ),
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
            className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] whitespace-nowrap font-normal text-xs"
          >
            <div
              style={{
                backgroundColor: statusColorMap[item.status]?.text || "#000000",
              }}
              className="w-[5px] h-[5px] rounded-full"
            ></div>
            {item.status}
          </Badge>
        </div>
      );
    },
  },

  {
    header: () => <CustomCell value="" className="w-full md:max-w-[3rem]" />,
    accessorKey: "action",
    cell: ({ row }) => (
      <div className="flex place-content-end items-center gap-2">
        <CustomCell
          value={<Actions data={row.original} />}
          className="flex justify-center items-center w-full md:max-w-[3rem]"
        />
      </div>
    ),
  },
];

export default columns;
