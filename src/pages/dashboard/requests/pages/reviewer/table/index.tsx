import View from "@/components/custom/Icons/View";
import { Badge } from "@/components/ui/badge";
import CustomTable, { ColumnSetup, CustomCell } from "@/components/custom/CustomTable";
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import ReviewerRequestSummary from "../../../view-requests/reviewer";



type TableRequestsProps = {
    reviewTableData: {
        title: string;
        applicantName: string;
        submission: string;
        status: string;
    }[],
    activeTab?: string,

}


const statusColorMap: { [key: string]: { bg: string; text: string } } = {
    Unreviewed: { bg: '#ffcce6', text: '#254D4B' },
    Reviewed: { bg: '#b3e6ff', text: '#333A33' },
    Reopened: { bg: '#ffd9b3', text: '#BF1E2C' },
  };



    export default function ReviewRequestsTable( { reviewTableData, activeTab="request table" }: TableRequestsProps) {
        const { multiStatusDateFilter } = useGlobalFilter()

        const columnData: ColumnSetup<any>[]= [
            {
                header: () => <CustomCell value={"Title"} className="font-bold w-full min-w-[18.75rem]" />,
                accessorKey: "title",
                cell: (info) => <CustomCell value={info.getValue()} className="min-w-[18.75rem] w-full" />,
        
            },
            {
                header: () => <CustomCell value={"Applicant Name"} className="font-bold w-full min-w-[10rem]" />,
                accessorKey: "applicantName",
                cell: (info) => <CustomCell value={info.getValue()} className="min-w-[10rem] w-full" />,
            },
            {
                header: () => <CustomCell value={"Submission"} className="font-bold w-full min-w-[8rem]" />,
                accessorKey: "submission",
                cell: ({ getValue }) => <CustomCell value={getValue()} className="min-w-[8rem] w-full" />,
                filterFn: multiStatusDateFilter,
                enableGlobalFilter: false,
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue }) => {
                const item = getValue();
                    return (
                        <span className="text-left min-w-[8.75rem] flex justify-left !text-xs">
                            <Badge
                              style={{
                                color: statusColorMap[item]?.text || 'white',
                                backgroundColor: statusColorMap[item]?.bg || '#192C8A',
                              }}
                              className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem]"
                            >
                              <div
                                style={{
                                  backgroundColor: statusColorMap[item]?.text || '#192C8A',
                                }}
                                className="w-[5px] h-[5px] rounded-full"
                              ></div>
                              {item}
                            </Badge>
                        </span>
                      );
                },
                filterFn: multiStatusDateFilter,
                enableGlobalFilter: false,
            },
            {
                accessorKey: "custom",
                header: () => <CustomCell value="" className="w-full md:max-w-[3rem]" />,
                meta: { cellType: "custom" },
                cell: ({ row }) => {
                    const item = row.original;
                    return (
                        <div className="flex justify-center gap-2 text-black p-3 cursor-pointer">
                        {/* open a drawer to view */}
                        <Sheet>
                            <SheetTrigger className="flex gap-2">
                                <View /> <span>View</span>
                            </SheetTrigger>
                            <ReviewerRequestSummary request={item?.request} activeTab={activeTab} />
                        </Sheet>
                    </div>
                    )      
                    },
                }
        ]

        return(
            <div id='open'>
                <CustomTable columns={columnData} data={reviewTableData} />
            </div>
        )
    }

    // 8388f770-a8ed-4080-a0ee-01fafb2f8bbb - request
    // a3ac1d5a-291d-4c30-b7dc-24ffba9b86ac - reviewer