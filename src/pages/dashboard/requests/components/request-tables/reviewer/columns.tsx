import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CustomCell } from "@/components/custom/CustomTable";
import { statusColorMap } from "@/lib/utils";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import View from "@/components/custom/Icons/View";
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
            className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] font-normal text-xs whitespace-nowrap "
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
      <div className="flex place-content-center items-center gap-2">
        <CustomCell
          value={
            <Sheet>
              <SheetTrigger className="flex gap-2">
                <View /> <span>View</span>
              </SheetTrigger>
              <ReviewerRequestSummary request={row.original.request} />
            </Sheet>
          }
          className="flex justify-center items-center w-full md:max-w-[3rem]"
        />
      </div>
    ),
  },
];

export default columns;
