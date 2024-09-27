import CustomTable, { ColumnSetup } from "@/components/custom/CustomTable";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import View from "@/components/custom/Icons/View";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";
import Loader from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";
import ViewRequests from "../../view-requests";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import FilterIcon from "@/components/custom/Icons/Filter";
import SearchIcon from "@/components/custom/Icons/Search";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import ArrowRight from "@/components/custom/Icons/ArrowRight";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";
import Tick from "@/components/custom/Icons/Tick";
import { Button } from "@/components/ui/button";

// refactor render functions and mobile render

type SelectSingleEventHandler = (day: Date | undefined) => void;

type TableRequestsProps = {
    tableData: {
        id: string;
        title: string;
        specialization: string;
        submission: string;
        status: string;
    }[]
  }

  type RenderFunctionsProps = {
    item: {
        title: string;
        specialization: string;
        submission: string;
        status: string;
    },
    onDelete: (item: any) => void,
    loading: boolean,
  }


  const statusColorMap: { [key: string]: { bg: string; text: string } } = {
    Approved: { bg: '#34A85347', text: '#254D4B' },
    Pending: { bg: '#CDD0CD', text: '#333A33' },
    Declined: { bg: '#E7484847', text: '#BF1E2C' },
    Draft: { bg: '#192C8A1A', text: '#040C21' },
    "Under Review": { bg: '#F2C374', text: '#452609' },
  };


function RenderFunctions({ item, onDelete, loading, }: RenderFunctionsProps) {

    const { setStep } = useRequestsStore();
    const navigate = useNavigate();
 

    const redirectToSummary = () => {
        navigate('/requests/create');
        setStep(5);
    }

    return (
        <>
        {loading && <Loader />}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button><MoreIcon /></button>
            </DropdownMenuTrigger >
            <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
                <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
                        <Sheet>
                            <SheetTrigger className="flex justify-center gap-2 text-black p-3">
                                <View />
                                <span>View</span>
                            </SheetTrigger>
                            <ViewRequests />
                        </Sheet>
                         <div>
                            <button onClick={redirectToSummary} className={` ${item.status === "Draft" ? "text-black" : "text-black/30"} flex justify-center gap-2 p-3`} disabled={item.status !== "Draft"}>
                                <PencilEdit />
                                <span>Edit</span>
                            </button>
                        </div>
                    <Sheet>
                        <SheetTrigger className="flex justify-center gap-2 text-black p-3">
                            <DeleteSmallIcon />
                            <span>Delete</span>
                        </SheetTrigger>
                        <RenderDeleteSheet text="Are you sure you want to delete this request?" data={item} deleteItem={(item) => {onDelete(item)}} />
                    </Sheet>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
        
    )
}

function MobileRender({ item, onDelete, loading }: RenderFunctionsProps) {
    const { setStep } = useRequestsStore();
    const navigate = useNavigate();

    const redirectToSummary = () => {
            navigate('/requests/create');
            setStep(5);
        }

    return(
        <>
             {loading && <Loader />}
             <div className="flex gap-2 justify-center items-center">
                <Sheet>
                    <SheetTrigger className="text-black p-2">
                        <View />
                    </SheetTrigger>
                    <ViewRequests />
                </Sheet>
                <div>
                    <button onClick={redirectToSummary} className={` ${item.status === "Draft" ? "text-black" : "text-black/30"} flex justify-center gap-2 p-2`} disabled={item.status !== "Draft"}>
                        <PencilEdit />
                    </button>
                </div>
                <Sheet>
                    <SheetTrigger className="flex justify-center gap-2 text-black p-2">
                        <DeleteSmallIcon />
                    </SheetTrigger>
                    <RenderDeleteSheet text="Are you sure you want to delete this request?" data={item} deleteItem={(item) => {onDelete(item)}} />
                </Sheet>
            </div>
        </>
    )
}



export default function TableRequests({ tableData }: TableRequestsProps) {
    const [loading, setLoading] = useState(false);
    const [tableArray, setTableArray] = useState(tableData);
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [showStatuses, setShowStatuses] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState<String[]>([]);
    const [open, setOpen] = useState(false);

    function deleteTableItem(item: any) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
      setTableArray((prevTableArray) => prevTableArray.filter((data) => data.id !== item.id)
      );
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelect = (value: string) => {
        setSelectedStatuses((prev) =>
            prev.includes(value) ? prev.filter((val) => val !== value) : [...prev, value]
          );
      };

    const deleteStatusUpdate = (status: String) => {
        setSelectedStatuses((prev) => prev.filter((val) => val !== status))
    }
    

    const handleStartDateChange: SelectSingleEventHandler = (day: Date | undefined) => {
        setStartDate(day || undefined);
    };


    const handleEndDateChange: SelectSingleEventHandler = (day: Date | undefined) => {
        setEndDate(day || undefined);  
    };

    // format date to backend date format
    function formatDateToDDMMYYYY(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');  // Get the day and pad with 0 if necessary
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based, so add 1
        const year = date.getFullYear();  // Get the full year
        return `${day}-${month}-${year}`;  // Return in DD-MM-YYYY format
    }

    function parseDate(dateString: string) {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    // refactor setFilters function
    const setFilters = () => {
        let filtered = tableData;

        if (searchTerm) {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(
            (item) =>
            item.title.toLowerCase().includes(lowercasedSearchTerm) ||
            item.specialization.toLowerCase().includes(lowercasedSearchTerm)
        );
        }

        if (selectedStatuses.length > 0) {
            filtered = filtered.filter((item) =>
                selectedStatuses.includes(item.status)
            )
        }

        if (startDate && endDate) {
            const formattedStartDate = formatDateToDDMMYYYY(startDate); // convert input date to backend date format
            const formattedEndDate = formatDateToDDMMYYYY(endDate);
        
            filtered = filtered.filter((item) => {
                const submissionDate = parseDate(item.submission);  // Convert backend date string to Date
                return submissionDate >= parseDate(formattedStartDate) && submissionDate <= parseDate(formattedEndDate); // use parsed dates to compare
            });
        } else if (startDate) {
            const formattedStartDate = formatDateToDDMMYYYY(startDate);
        
            filtered = filtered.filter((item) => {
                const submissionDate = parseDate(item.submission);  
                return submissionDate >= parseDate(formattedStartDate);
            });
        } else if (endDate) {
            const formattedEndDate = formatDateToDDMMYYYY(endDate);
        
            filtered = filtered.filter((item) => {
                const submissionDate = parseDate(item.submission);  
                return submissionDate <= parseDate(formattedEndDate);
            });
        }

        setTableArray(filtered);
    };

    const applyFilters = () => {
        setLoading(true);
        setTimeout(() => {
        setFilters(); 
        setShowStatuses(true);
        setOpen(false);
        setLoading(false); 
        }, 3000);
    }

 


    const statuses = [
        "Draft",
        "Pending",
        "Approved",
        "Under Review",
        "Declined",
        "Reapproved"
    ]

    const columnData: ColumnSetup<any>[]= [
        {
            header: "Title",
            accessor: "title",
            cellType: 'text',
            headerClass: "font-bold w-full min-w-[18.75rem] ",
            cellClass: " min-w-[18.75rem] w-full "
    
        },
        {
            header: "Specialization",
            accessor: "specialization",
            cellType: "text",
            headerClass: "font-bold min-w-[8rem] w-full",
            cellClass: "min-w-[8rem] w-full"
        },
        {
            header: "Submission",
            accessor: "submission",
            cellType: "text",
            headerClass: "font-bold w-full min-w-[8rem]",
            cellClass: "min-w-[8rem] w-full"
        },
        // {
        //     header: "Expiry",
        //     accessor: "expiry",
        //     cellType: "text",
        //     headerClass: "font-bold w-full min-w-[8rem]",
        //     cellClass: "min-w-[8rem] "
        // },
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
            cellClass: "flex justify-center items-center w-full md:max-w-[3rem]",
            headerClass: "w-full md:max-w-[3rem]",
            customRender: (item: any) => {
                return isMobile ? (
                  <MobileRender item={item} onDelete={deleteTableItem} loading={loading} />
                ) : (
                  <RenderFunctions item={item} onDelete={deleteTableItem} loading={loading} />
                );
              }
              
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem]">
                        <SearchIcon />
                        <input 
                            name="search"
                            placeholder="Search"
                            type="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border-none hover:border-none focus:border-none hover:border-none w-full focus-visible:outline-none"/>
                    </div>
                    <div className="flex gap-2 p-1 items-center w-fit">
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger asChild>
                                <div className="bg-[#14155E14] hover:bg-[#14155E33] rounded-full p-2 flex items-center justify-center"><FilterIcon /></div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-full min-w-[13.25rem] h-full min-h-[11.875rem] rounded-xl rounded-tl-none px-4 py-3 flex flex-col gap-8 border border-[#0C0C0F29] dropdown-shadow">
                                <div className="gap-2 flex flex-col justify-center">
                                    <p className="font-semibold text-sm text-[#6A6C6A] px-1">Status</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <div className="w-full border border-[#0E0F0C1F] rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold"><span>Show All</span><span><ArrowRight /></span></div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" side="right" className="w-full min-w-[11.25rem] rounded-xl px-4 py-3 flex flex-col gap-8 border border-[#0C0C0F29] dropdown-shadow">
                                            <ul className="flex flex-col items-start gap-4">
                                                {statuses.map((status: string) =>(
                                                    <DropdownMenuItem className="flex gap-2 items-center justify-start w-full" key={status} onClick={() => handleSelect(status)}>
                                                            {selectedStatuses.includes(status) ? <Tick /> : <div className="w-6 h-6">&nbsp;</div>}
                                                            {status}
                                                    </DropdownMenuItem>))}
                                            </ul>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="gap-2 flex flex-col justify-center">
                                    <p className="font-semibold text-sm text-[#6A6C6A] px-1">Time Range</p>
                                    <div className="flex justify-between items-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><div className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">Start Date</div></DropdownMenuTrigger>
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
                                            <DropdownMenuTrigger><div className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">End Date</div></DropdownMenuTrigger>
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
                                <div className="flex items-center gap-3">
                                    <Button className="w-full max-w-[5.25rem] py-[0.313rem] px-3 rounded font-semibold text-sm text-[#868687]" variant="ghost" onClick={() => {setOpen(false)}}>Cancel</Button>
                                    <Button className="w-full max-w-[5.25rem] py-[0.313rem] px-3 rounded font-semibold text-sm text-white" onClick={applyFilters}>Apply</Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <p className="font-semibold text-[#6A6A6B] inter">Filters</p>
                    </div>
                </div>
                <div className="lg:flex items-center gap-1 hidden">
                    <span><a href="" className="font-semibold underline text-black">The approval process</a></span>
                    <span><LinkIcon /></span>
                </div>
            </div>
            {showStatuses &&
                <div className="flex flex-wrap justify-center items-center p-4 gap-3">
                    {selectedStatuses.map((status) => (
                        <div className="py-1 px-2 border border-[#0C0C0F29] rounded-[0.625rem] flex items-center gap-1 md:gap-2 w-full max-w-fit">
                            <span className="w-[5px] h-[5px] bg-[#FFD13A] rounded-full"></span>
                            <span className="text-xs font-semibold text-[#0C0D0F] w-full min-w-fit flex text-wrap">{status}</span>
                            <span onClick={() => deleteStatusUpdate(status)}><X size={10}/></span>
                        </div>
                    ))}    
                </div>
                }
            <CustomTable columns={columnData} data={tableArray} />
        </div>
    )
}