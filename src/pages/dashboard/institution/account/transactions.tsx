import { tableData, tranxData } from "@/lib/helpers";

import { Button } from "@/components/ui/button";
// import { useRole } from "@/hooks/useRole";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import SearchIcon from "@/components/custom/Icons/Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import Tick from "@/components/custom/Icons/Tick";
import FilterIcon from "@/components/custom/Icons/Filter";
import ArrowRight from "@/components/custom/Icons/ArrowRight";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import EmptyRequests from "../../requests/components/empty-state";
import BackArrow from "@/components/custom/Icons/BackArrow";
import TransactionTable from "../components/TransactionTable";
type SelectSingleEventHandler = (day: Date | undefined) => void;

export default function Transactions() {
  // const { role } = useRole();
  const [statusFilter, setStatusFilter] = useState<String[]>([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showTick, setShowTick] = useState("");
  const [open, setOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("Status");
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<String[]>([]);
  const [appliedStatuses, setAppliedStatuses] = useState(selectedStatuses);
  const [showStatuses, setShowStatuses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statuses] = useState<any[]>([]);
  const navigate = useNavigate();

  const { globalFilter, setGlobalFilter, setColumnFilters } = useGlobalFilter();

  // const transactionStatus = ["Confirmed", "Unconfirmed", "Declined", "Pending"];

  function formatDateToDDMMYYYY(date: Date) {
    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const year = date.getFullYear(); // Get the full year
    return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const handleSelectStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((val) => val !== status)
        : [...prev, status]
    );
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((val) => val !== status)
        : [...prev, status]
    );
  };

  const handleStartDateChange: SelectSingleEventHandler = (
    day: Date | undefined
  ) => {
    setStartDate(day || undefined);
    setStartCalendarOpen(false);
  };

  const handleEndDateChange: SelectSingleEventHandler = (
    day: Date | undefined
  ) => {
    setEndDate(day || undefined);
    setEndCalendarOpen(false);
  };

  const deleteStatusUpdate = (status: String) => {
    setAppliedStatuses((prev) => prev.filter((val) => val !== status));
    if (appliedStatuses.length === 0) {
      setShowStatuses(false);
    }
  };

  const setFilters = () => {
    const filters = [];
    if (statusFilter && statusFilter.length > 0) {
      filters.push({
        id: "status", // The column ID
        value: statusFilter, // An array of status values ['Draft', 'Pending']
      });
    }
    if (startDate && endDate) {
      const formattedStartDate = formatDateToDDMMYYYY(startDate); // convert input date to backend date format
      const formattedEndDate = formatDateToDDMMYYYY(endDate);

      filters.push({
        id: "submission",
        value: { formattedStartDate, formattedEndDate },
      });
    }
    setColumnFilters(filters);
  };

  const applyFilters = () => {
    setLoading(true);
    setTimeout(() => {
      setFilters();
      setShowStatuses(true);
      setAppliedStatuses([...selectedStatuses]);
      setOpen(false);
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-12 mb-20">
        <div className="flex flex-col md:flex-row gap-5 md:gap-auto  md:items-center mx-auto w-full">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackArrow />
          </span>
          <h1 className="text-[1.875rem] font-bold">Payment Transactions</h1>
        </div>
        {/* tab */}
        {tableData && tableData.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem]">
                  <SearchIcon />
                  <input
                    name="search"
                    placeholder="Search"
                    type="search"
                    value={globalFilter}
                    onChange={handleSearchChange}
                    className="border-none hover:border-none focus:border-none w-full focus-visible:outline-none"
                  />
                </div>
                <div className="flex gap-2 p-1 items-center w-fit">
                  <DropdownMenu
                    open={open}
                    onOpenChange={setOpen}
                    modal={false}
                  >
                    <DropdownMenuTrigger asChild>
                      <div className="bg-[#14155E14] hover:bg-[#14155E33] rounded-full p-2 flex items-center justify-center">
                        <FilterIcon />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-full h-full min-h-[11.875rem] rounded-xl rounded-tl-none px-4 py-3 flex gap-2 border border-[#0C0C0F29] dropdown-shadow"
                    >
                      <div className="gap-8 flex flex-col justify-start w-full md:min-w-[12rem]">
                        <div className="gap-2 flex flex-col justify-center">
                          <p className="font-semibold text-sm text-[#6A6C6A] px-1">
                            Status
                          </p>
                          <button
                            onClick={() => {
                              setActiveContent("Status");
                            }}
                          >
                            <div className="w-full border border-[#0E0F0C1F] rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold">
                              <span>
                                {selectedStatuses.length > 0
                                  ? `${selectedStatuses.length} selected`
                                  : "Show All"}
                              </span>
                              <span>
                                <ArrowRight />
                              </span>
                            </div>
                          </button>
                        </div>
                        <div className="gap-2 flex flex-col justify-center">
                          <p className="font-semibold text-sm text-[#6A6C6A] px-1">
                            Date
                          </p>
                          <button
                            onClick={() => {
                              setActiveContent("Date");
                            }}
                          >
                            <div className="w-full border border-[#0E0F0C1F] rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold">
                              <span>Select Date</span>
                              <span>
                                <ArrowRight />
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="border-l-[#0E0F0C1F] border"></div>
                      <div
                        className={`${
                          activeContent === "Status"
                            ? "gap-3"
                            : "justify-between"
                        } w-full flex flex-col`}
                      >
                        {activeContent === "Status" ? (
                          <div className="w-full min-w-[11.25rem] px-4 py-3 flex flex-col gap-8">
                            <ul className="flex flex-col items-start">
                              {statuses.map((status: string) => (
                                <div
                                  onMouseEnter={() => {
                                    setShowTick(status);
                                  }}
                                  onMouseLeave={() => {
                                    setShowTick("");
                                  }}
                                  className={`flex gap-2 py-2 items-center justify-start w-full text-xs font-[500] ${
                                    showTick === status ||
                                    selectedStatuses.includes(status)
                                      ? "text-black bg-[#192C8A0D]"
                                      : "text-[#6A6C6A]"
                                  }`}
                                  key={status}
                                  onClick={() => handleSelectStatus(status)}
                                >
                                  {selectedStatuses.includes(status) ||
                                  showTick === status ? (
                                    <Tick />
                                  ) : (
                                    <div className="w-6 h-6">&nbsp;</div>
                                  )}
                                  {status}
                                </div>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          activeContent === "Date" && (
                            <div className="gap-2 flex flex-col justify-center">
                              <div className="flex gap-3 items-center">
                                <DropdownMenu
                                  open={startCalendarOpen}
                                  onOpenChange={setStartCalendarOpen}
                                  modal={false}
                                >
                                  <DropdownMenuTrigger>
                                    <div className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">
                                      {startDate
                                        ? `${formatDateToDDMMYYYY(startDate)}`
                                        : "Start date"}
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="start"
                                    side="bottom"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={startDate}
                                      onSelect={handleStartDateChange}
                                      disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                    />
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu
                                  open={endCalendarOpen}
                                  onOpenChange={setEndCalendarOpen}
                                  modal={false}
                                >
                                  <DropdownMenuTrigger>
                                    <div className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]">
                                      {endDate
                                        ? `${formatDateToDDMMYYYY(endDate)}`
                                        : "End date"}
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    side="bottom"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={endDate}
                                      onSelect={handleEndDateChange}
                                      disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                    />
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          )
                        )}
                        <div className="flex items-center gap-3 align-self-end">
                          <Button
                            className="w-full max-w-[5.25rem] py-[0.313rem] px-3 rounded font-semibold text-sm text-[#868687]"
                            variant="ghost"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="w-full max-w-[5.25rem] py-[0.313rem] px-3 rounded font-semibold text-sm text-white"
                            onClick={applyFilters}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="font-semibold text-[#6A6A6B] inter">Filters</p>
                </div>
              </div>
            </div>
            {isMobile && showStatuses && appliedStatuses.length !== 0 && (
              <div className="flex flex-wrap justify-center items-center p-4 gap-3">
                {appliedStatuses.map((status) => (
                  <div className="py-2 px-3 border border-[#0C0C0F29] rounded-[0.625rem] flex items-center justify-start gap-2 w-full max-w-fit">
                    <span className="w-[6px] h-[5px] bg-[#FFD13A] rounded-full"></span>
                    <span className="text-xs font-semibold text-[#0C0D0F] w-full min-w-fit flex text-wrap">
                      {status}
                    </span>
                    <span onClick={() => deleteStatusUpdate(status)}>
                      <X size={10} />
                    </span>
                  </div>
                ))}
              </div>
            )}
            <TransactionTable accountTableData={tranxData} />
          </div>
        ) : (
          <EmptyRequests />
        )}
      </div>
    </>
  );
}
