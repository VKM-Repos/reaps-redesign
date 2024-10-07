import CustomTable, { ColumnSetup, CustomCell } from "@/components/custom/CustomTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import { useEffect, useState } from "react";
// import MoreIcon from "@/components/custom/Icons/MoreIcon";
import Loader from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// import FilterIcon from "@/components/custom/Icons/Filter";
// import SearchIcon from "@/components/custom/Icons/Search";
// import LinkIcon from "@/components/custom/Icons/LinkIcon";
// import ArrowRight from "@/components/custom/Icons/ArrowRight";
// import { Calendar } from "@/components/ui/calendar";
// import { X } from "lucide-react";
// import Tick from "@/components/custom/Icons/Tick";
// import { Button } from "@/components/ui/button";
import SharedActions from "./custom/SharedActions";

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


  function RenderFunctions({ item, onDelete, loading }: RenderFunctionsProps) {
    const { setStep } = useRequestsStore();
    const navigate = useNavigate();
  
    const redirectToSummary = () => {
      navigate("/requests/create");
      setStep(5);
    };
  
    return (
      <>
        {loading && <Loader />}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button><MoreIcon /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
            <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
              <SharedActions item={item} onDelete={onDelete} redirectToSummary={redirectToSummary} />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
  function MobileRender({ item, onDelete, loading }: RenderFunctionsProps) {
    const { setStep } = useRequestsStore();
    const navigate = useNavigate();
  
    const redirectToSummary = () => {
      navigate("/requests/create");
      setStep(5);
    };
  
    return (
      <>
        {loading && <Loader />}
        <div className="flex gap-2 justify-center items-center">
          <SharedActions item={item} onDelete={onDelete} redirectToSummary={redirectToSummary} isMobile />
        </div>
      </>
    );
  }



export default function TableRequests({ tableData }: TableRequestsProps) {
    // const [loading, setLoading] = useState(false);
    // const [tableArray, setTableArray] = useState(tableData);
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    // const [searchTerm, setSearchTerm] = useState('');
    // const [startDate, setStartDate] = useState<Date | undefined>();
    // const [endDate, setEndDate] = useState<Date | undefined>();
    // const [showStatuses, setShowStatuses] = useState(false);
    // const [selectedStatuses, setSelectedStatuses] = useState<String[]>([]);
    // const [appliedStatuses, setAppliedStatuses] = useState(selectedStatuses)
    // const [open, setOpen] = useState(false);
    // const [filteredData, setFiltered] = useState(tableData);
    // const [startCalendarOpen, setStartCalendarOpen] = useState(false);
    // const [endCalendarOpen, setEndCalendarOpen] = useState(false);
    // const [activeContent, setActiveContent] = useState("Status");
    // const [showTick, setShowTick] = useState("");

    // // set active modal, click on button trigger which one is seen 
    // // always have apply and cancel buttons, what's changing is the status and date content

    // function deleteTableItem(item: any) {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000);
    //   setTableArray((prevTableArray) => prevTableArray.filter((data) => data.id !== item.id)
    //   );
    // }

    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value);
    // };

    // const handleSelect = (value: string) => {
    //     setSelectedStatuses((prev) =>
    //         prev.includes(value) ? prev.filter((val) => val !== value) : [...prev, value]
    //       );
    //   };

    // const deleteStatusUpdate = (status: String) => {
    //     setAppliedStatuses((prev) => prev.filter((val) => val !== status))
    //     if(appliedStatuses.length === 0)
    //         {
    //             setShowStatuses(false);
    //         }
    // }
    

    // const handleStartDateChange: SelectSingleEventHandler = (day: Date | undefined) => {
    //     setStartDate(day || undefined);
    //     setStartCalendarOpen(false);
    // };


    // const handleEndDateChange: SelectSingleEventHandler = (day: Date | undefined) => {
    //     setEndDate(day || undefined);  
    //     setEndCalendarOpen(false);
    // };

    // // format date to backend date format
    // function formatDateToDDMMYYYY(date: Date) {
    //     const day = String(date.getDate()).padStart(2, '0');  // Get the day and pad with 0 if necessary
    //     const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based, so add 1
    //     const year = date.getFullYear();  // Get the full year
    //     return `${day}-${month}-${year}`;  // Return in DD-MM-YYYY format
    // }

    // function parseDate(dateString: string) {
    //     const [day, month, year] = dateString.split('-');
    //     return new Date(`${year}-${month}-${day}`);
    // }

    // // refactor setFilters function
    // const setFilters = () => {
    //     let filtered = tableData;  

    //     if (selectedStatuses.length > 0) {
    //         filtered = filtered.filter((item) =>
    //             selectedStatuses.includes(item.status)
    //         )
    //     }

    //     if (startDate && endDate) {
    //         const formattedStartDate = formatDateToDDMMYYYY(startDate); // convert input date to backend date format
    //         const formattedEndDate = formatDateToDDMMYYYY(endDate);
        
    //         filtered = filtered.filter((item) => {
    //             const submissionDate = parseDate(item.submission);  // Convert backend date string to Date
    //             return submissionDate >= parseDate(formattedStartDate) && submissionDate <= parseDate(formattedEndDate); // use parsed dates to compare
    //         });
    //     } else if (startDate) {
    //         const formattedStartDate = formatDateToDDMMYYYY(startDate);
        
    //         filtered = filtered.filter((item) => {
    //             const submissionDate = parseDate(item.submission);  
    //             return submissionDate >= parseDate(formattedStartDate);
    //         });
    //     } else if (endDate) {
    //         const formattedEndDate = formatDateToDDMMYYYY(endDate);
        
    //         filtered = filtered.filter((item) => {
    //             const submissionDate = parseDate(item.submission);  
    //             return submissionDate <= parseDate(formattedEndDate);
    //         });
    //     }

    //     setFiltered(filtered)
    //     setTableArray(filteredData);

    // };

    // const applySearch = (filteredData: typeof tableData) => {
    //     if (searchTerm) {
    //         const lowercasedSearchTerm = searchTerm.toLowerCase();
    //         filteredData = filteredData.filter(
    //             (item) =>
    //             item.title.toLowerCase().includes(lowercasedSearchTerm) ||
    //             item.specialization.toLowerCase().includes(lowercasedSearchTerm)
    //         );
    //     }
    //     setTableArray(filteredData)
    // }

    // const applyFilters = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //     setFilters(); 
    //     setShowStatuses(true);
    //     setAppliedStatuses([...selectedStatuses]);
    //     setOpen(false);
    //     setLoading(false); 
    //     }, 3000);
    // }

    // useEffect(() => {
    //     applySearch(filteredData);
    // }, [filteredData, searchTerm])

 


    // const statuses = [
    //     "Draft",
    //     "Pending",
    //     "Approved",
    //     "Under Review",
    //     "Declined",
    //     "Reapproved"
    // ]

    // const statusFilterFn = (rows, columnIds, filterValue) => {
    //     // filterValue is the array of selected statuses
    //     return rows.filter((row) => {
    //       return filterValue.includes(row.values.status);
    //     });
    //   };

    const columnData: ColumnSetup<any>[]= [
        {
            header: () => <CustomCell value={"Title"} className="font-bold w-full min-w-[18.75rem]" />,
            accessorKey: "title",
            cell: (info) => <CustomCell value={info.getValue()} className="min-w-[18.75rem] w-full" />,
        },
        {
            header: () => <CustomCell value={"Specialization"} className="font-bold min-w-[9rem] w-full" />,
            accessorKey: "specialization",
            cell: (info) => <CustomCell value={info.getValue()} className="min-w-[9rem] w-full" />,
        },
        {
            header: () => <CustomCell value={"Submission"} className="font-bold w-full min-w-[11rem]" />,
            accessorKey: "submission",
            cell: (info) => <CustomCell value={info.getValue()} className="min-w-[11rem] w-full" />,
            // filterFn: (row, id, filterValue) => {
            //     const startDate = new Date(filterValue.startDate);
            //     const endDate = new Date(filterValue.endDate);
            //     const submissionDate = new Date(row.getValue(id));
            //     // console.log(startDate)
            //     return submissionDate >= startDate && submissionDate <= endDate;
            // },
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ getValue }) => {
                const item = getValue();
                return (
                    <span className="text-left min-w-[8.75rem] flex justify-left !text-xs -font-bold w-full min-w-[8.75rem]">
                        <Badge
                          style={{
                            color: statusColorMap[item]?.text || '#000000',
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
            // filterFn: (rows, columnIds, filterValue) => {
            //     // filterValue is the array of selected statuses
            //     console.log(rows.values.status);
            //     console.log(filterValue)
            //     return rows.filter((row) => {
            //       return filterValue.includes(row.values.status);
            //     });
            //   },

        },
        {
            accessorKey: "custom",
            header: () => <CustomCell value="" className="w-full md:max-w-[3rem]" />,
            meta: { cellType: "custom" },
            cell: ({ row }) => {
                const item = row.original;
                return isMobile ? (
                  <CustomCell value={<MobileRender item={item} onDelete={deleteTableItem} loading={loading} />} className="flex justify-center items-center w-full md:max-w-[3rem]" />
                ) : (
                    <CustomCell value={<RenderFunctions item={item} onDelete={deleteTableItem} loading={loading} />} className="flex justify-center items-center justify-self-end w-full md:max-w-[3rem]" />
                );
              }
              
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            {/* <div className="flex items-center justify-between">
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
                        <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                            <DropdownMenuTrigger asChild>
                                <div className="bg-[#14155E14] hover:bg-[#14155E33] rounded-full p-2 flex items-center justify-center"><FilterIcon /></div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-full h-full min-h-[11.875rem] rounded-xl rounded-tl-none px-4 py-3 flex gap-2 border border-[#0C0C0F29] dropdown-shadow">
                                <div className="gap-8 flex flex-col justify-start w-full md:min-w-[12rem]">
                                    <div className="gap-2 flex flex-col justify-center">
                                        <p className="font-semibold text-sm text-[#6A6C6A] px-1">Status</p>
                                        <button onClick={() => {setActiveContent("Status")}}>
                                            <div className="w-full border border-[#0E0F0C1F] rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold"><span>{selectedStatuses.length > 0 ? `${selectedStatuses.length} selected` : "Show All"}</span><span><ArrowRight /></span></div>
                                        </button>
                                    
                                    </div>
                                    <div className="gap-2 flex flex-col justify-center">
                                        <p className="font-semibold text-sm text-[#6A6C6A] px-1">Date</p>
                                        <button onClick={() => {setActiveContent("Date")}}>
                                            <div className="w-full border border-[#0E0F0C1F] rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold"><span>Select Date</span><span><ArrowRight /></span></div>
                                        </button>
                                    </div>
                                </div>
                                <div className="border-l-[#0E0F0C1F] border"></div>
                                <div className={`${activeContent === "Status" ? "gap-3" : "justify-between"} w-full flex flex-col`}>
                                    {activeContent === "Status" ? 
                                        (<div className="w-full min-w-[11.25rem] px-4 py-3 flex flex-col gap-8">
                                            <ul className="flex flex-col items-start">
                                                {statuses.map((status: string) =>(
                                                    <div onMouseEnter={() => {setShowTick(status)}} onMouseLeave={() => {setShowTick("")}} className={`flex gap-2 py-2 items-center justify-start w-full text-xs font-[500] ${showTick === status || selectedStatuses.includes(status) ? "text-black bg-[#192C8A0D]" : "text-[#6A6C6A]"}`} key={status} onClick={() => handleSelect(status)}>
                                                        {selectedStatuses.includes(status) || showTick === status ? <Tick /> : <div className="w-6 h-6">&nbsp;</div>}
                                                        {status}
                                                    </div>))}
                                            </ul>
                                        </div>)
                                        : activeContent === "Date" &&
                                        (
                                        <div className="gap-2 flex flex-col justify-center">
                                            <div className="flex gap-3 items-center">
                                                <DropdownMenu open={startCalendarOpen} onOpenChange={setStartCalendarOpen} modal={false}>
                                                    <DropdownMenuTrigger><div className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">{startDate ? `${formatDateToDDMMYYYY(startDate)}` : "Start date"}</div></DropdownMenuTrigger>
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
                                                <DropdownMenu open={endCalendarOpen} onOpenChange={setEndCalendarOpen} modal={false}>
                                                    <DropdownMenuTrigger><div className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">{endDate ? `${formatDateToDDMMYYYY(endDate)}` : "End date"}</div></DropdownMenuTrigger>
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
                                        )
                                    }
                                    <div className="flex items-center gap-3 align-self-end">
                                        <Button className="w-full max-w-[5.25rem] py-[0.313rem] px-3 rounded font-semibold text-sm text-[#868687]" variant="ghost" onClick={() => {setOpen(false)}}>Cancel</Button>
                                        <Button className="w-full max-w-[5.25rem] py-[0.313rem] px-3 rounded font-semibold text-sm text-white" onClick={applyFilters}>Apply</Button>
                                    </div>
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
            {isMobile && showStatuses && appliedStatuses.length !== 0 &&
                <div className="flex flex-wrap justify-center items-center p-4 gap-3">
                    {appliedStatuses.map((status) => (
                        <div className="py-2 px-3 border border-[#0C0C0F29] rounded-[0.625rem] flex items-center justify-start gap-2 w-full max-w-fit">
                            <span className="w-[6px] h-[5px] bg-[#FFD13A] rounded-full"></span>
                            <span className="text-xs font-semibold text-[#0C0D0F] w-full min-w-fit flex text-wrap">{status}</span>
                            <span onClick={() => deleteStatusUpdate(status)}><X size={10}/></span>
                        </div>
                    ))}    
                </div>
                } */}
            <CustomTable columns={columnData} data={tableArray} />
        </div>
    )
}