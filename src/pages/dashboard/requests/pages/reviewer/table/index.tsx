import View from "@/components/custom/Icons/View";
// import { Badge } from "@/components/ui/badge";
import CustomTable, {
  ColumnSetup,
  CustomCell,
} from "@/components/custom/CustomTable";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import ReviewerRequestSummary from "../../../view-requests/reviewer";

type TableRequestsProps = {
  reviewTableData: {
    id: string;
    title: string;
    applicantName: string;
    submission: string;
    status: string;
  }[];
  activeTab?: string;
};

// const statusColorMap: { [key: string]: { bg: string; text: string } } = {
//   Unreviewed: { bg: "#ffcce6", text: "#254D4B" },
//   Reviewed: { bg: "#b3e6ff", text: "#333A33" },
//   Reopened: { bg: "#ffd9b3", text: "#BF1E2C" },
// };

export default function ReviewRequestsTable({
  reviewTableData,
  activeTab,
}: TableRequestsProps) {
  const { multiStatusDateFilter } = useGlobalFilter();
  const columnData: ColumnSetup<any>[] = [
    {
      header: () => (
        <CustomCell
          value={"Title"}
          className="font-bold w-full min-w-[16.75rem]"
        />
      ),
      accessorKey: "title",
      cell: (info) => (
        <CustomCell
          value={info.getValue()}
          className="min-w-[16.75rem] w-full overflow-x-hidden"
        />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Applicant Name"}
          className="font-bold w-full min-w-[10rem]"
        />
      ),
      accessorKey: "applicantName",
      cell: (info) => (
        <CustomCell value={info.getValue()} className="min-w-[10rem] w-full" />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Approved Date"}
          className="font-bold w-full min-w-[8rem]"
        />
      ),
      accessorKey: "submission",
      cell: ({ getValue }) => (
        <CustomCell value={getValue()} className="min-w-[8rem] w-full" />
      ),
      filterFn: multiStatusDateFilter,
      enableGlobalFilter: false,
    },

    {
      accessorKey: "custom",
      header: () => <CustomCell value="" className="w-full md:max-w-[3rem]" />,
      meta: { cellType: "custom" },
      cell: ({ row }) => {
        const item = row.original;
        console.log(item, "items in row");

        return (
          <div className="flex justify-center gap-2 text-black p-3 cursor-pointer">
            {/* open a drawer to view */}
            <Sheet>
              <SheetTrigger className="flex gap-2">
                <View /> <span>View</span>
              </SheetTrigger>
              <ReviewerRequestSummary
                request={item.request}
                activeTab={activeTab}
              />
            </Sheet>
          </div>
        );
      },
    },
  ];

  return (
    <div id="open">
      <CustomTable columns={columnData} data={reviewTableData} />
    </div>
  );
}
