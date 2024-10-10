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
                                {/* <div className="flex gap-3 items-center">
                    <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem]">
                        <SearchIcon />
                        <input 
                            name="search"
                            placeholder="Search"
                            type="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border-none focus:border-none hover:border-none w-full focus-visible:outline-none"/>
                    </div>
                    <div className="flex gap-2 p-1 items-center w-fit">
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger asChild>
                                <button className="bg-[#14155E14] hover:bg-[#14155E33] rounded-full p-2 flex items-center justify-center"><FilterIcon /></button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-full min-w-[13.25rem] h-full min-h-[11.875rem] rounded-xl rounded-tl-none px-4 py-3 flex flex-col gap-8 border border-[#0C0C0F29] dropdown-shadow">
                                <div className="gap-2 flex flex-col justify-center">
                                    <p className="font-semibold text-sm text-[#6A6C6A] px-1">Status</p>
                                    <DropdownMenu>
                                        
                                        <DropdownMenuTrigger asChild>
                                            <button className="w-full border border-[#0E0F0C1F] rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A]"><span>Show All</span><span><ArrowRight /></span></button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" side="right" className="w-full min-w-[11.25rem] rounded-xl px-4 py-3 flex flex-col gap-8 border border-[#0C0C0F29] dropdown-shadow">
                                            <ul className="flex flex-col items-start gap-4">
                                                {statuses.map((status: string) =>(
                                                <button onClick={() => {handleStatusUpdate(status)}} className="hover:bg-[#14155E14] hover:text-black py-2 px-3 text-xs font-medium text-[#6A6C6A] rounded-lg w-full flex items-start">{status}</button>
                                                ))}
                                            </ul>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="gap-2 flex flex-col justify-center">
                                    <p className="font-semibold text-sm text-[#6A6C6A] px-1">Time Range</p>
                                    <div className="flex justify-between items-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><button className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">Start Date</button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" side="bottom">
                                                <Calendar
                                                    mode="single"
                                                    selected={startDate}
                                                    onSelect={handleStartDateChange}
                                                    disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><button className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">End Date</button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" side="bottom">
                                                <Calendar
                                                    mode="single"
                                                    selected={endDate}
                                                    onSelect={handleEndDateChange}
                                                    disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {status ? 
                            <div className="py-1 px-2 border border-[#0C0C0F29] rounded-[0.625rem] flex items-center gap-1 md:gap-2 w-full min-w-fit">
                                <span className="w-[5px] h-[5px] bg-[#FFD13A] rounded-full"></span>
                                <span className="text-xs font-semibold text-[#0C0D0F] w-full min-w-fit flex text-wrap">{status}</span>
                                <span onClick={() => deleteStatusUpdate()}><X size={10}/></span>
                            </div> 
                            : 
                            <p className="font-semibold text-[#6A6A6B] inter">Filters</p>
                        }
                        
                    </div>
                </div> */}
                <CustomTable columns={columnData} data={reviewTableData} />
            </>
        )
    }