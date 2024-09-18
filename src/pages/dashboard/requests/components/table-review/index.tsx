import View from "@/components/custom/Icons/View";
import { Badge } from "@/components/ui/badge";
import CustomTable, { ColumnSetup } from "@/components/custom/CustomTable";
import ApplicationSummary from "../../view-review";
import { Sheet, SheetTrigger } from "@/components/ui/sheet"


type TableRequestsProps = {
    reviewTableData: {
        title: string;
        applicantName: string;
        submission: string;
        status: string;
    }[],
}


const statusColorMap: { [key: string]: { bg: string; text: string } } = {
    Unreviewed: { bg: '#ffcce6', text: '#254D4B' },
    Reviewed: { bg: '#b3e6ff', text: '#333A33' },
    Reopened: { bg: '#ffd9b3', text: '#BF1E2C' },
  };



    export default function TableReview( { reviewTableData }: TableRequestsProps) {

        const columnData: ColumnSetup<any>[]= [
            {
                header: "Title",
                accessor: "title",
                cellType: 'text',
                headerClass: "font-bold w-full min-w-[18rem] ",
                cellClass: " min-w-[18rem] w-full "
        
            },
            {
                header: "Applicant Name",
                accessor: "applicantName",
                cellType: "text",
                headerClass: "font-bold w-full min-w-[8rem]",
                cellClass: "min-w-[8rem] w-full"
            },
            {
                header: "Submission",
                accessor: "submission",
                cellType: "text",
                headerClass: "font-bold w-full min-w-[8rem]",
                cellClass: "min-w-[8rem] w-full"
            },
            {
                header: "Status",
                accessor: "status",
                cellType: "custom",
                customRender: (item: any) => {
                    return (
                        <>
                            <Badge
                              style={{
                                color: statusColorMap[item.status]?.text || '#000000',
                                backgroundColor: statusColorMap[item.status]?.bg || '#192C8A',
                              }}
                              className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem]"
                            >
                              <div
                                style={{
                                  backgroundColor: statusColorMap[item.status]?.text || '#192C8A',
                                }}
                                className="w-[5px] h-[5px] rounded-full"
                              ></div>
                              {item.status}
                            </Badge>
                        </>
                      );
                },
                 headerClass: "font-bold w-full min-w-[8.75rem]",
                cellClass: "text-left min-w-[8.75rem] flex justify-left !text-xs"
            },
            {
                accessor: "custom",
                cellType: "custom",
                customRender: () => (
                    <div className="flex justify-center gap-2 text-black p-3 cursor-pointer">
                        {/* open a sheet to view */}
                        <Sheet>
                            <SheetTrigger className="flex gap-2">
                                <View /> <span>View</span>
                            </SheetTrigger>
                            <ApplicationSummary />
                        </Sheet>
                    </div>
                  ),
            }
        ]

        return(
            <>
                <CustomTable columns={columnData} data={reviewTableData} />
            </>
        )
    }