import SearchIcon from "@/components/custom/Icons/Search";
import React, { useEffect, useState } from "react";

import { useGlobalFilter } from "@/context/GlobalFilterContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterIcon from "@/components/custom/Icons/Filter";
import ArrowRight from "@/components/custom/Icons/ArrowRight";
import { Button } from "@/components/ui/button";
import Tick from "@/components/custom/Icons/Tick";
import { useLocation } from "react-router-dom";
import { formatISODate } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function SeachFilter({ 
  statuses, 
  activeTab, 
  setShowStatuses, 
  setLoading, 
  setAppliedStatuses
 }: { 
  statuses: string[], 
  activeTab?: string, 
  setShowStatuses: (showStatuses: boolean ) => void, 
  setLoading: (loading: boolean) => void, 
  setAppliedStatuses: (appliedStatuses: string[]) => void}) {


  const [open, setOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("Status");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [tickedStatuses, setTickedStatuses] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [statusFilter, setStatusFilter] = useState<String[]>([]);
  const [endDate, setEndDate] = useState<Date>();

  const { globalFilter, setGlobalFilter, setColumnFilters } = useGlobalFilter();
  const { pathname } = useLocation();

  // check if touch device 
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

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

  const handleTickedStatus = (status: string) => {
    setTickedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((val) => val !== status)
        : [...prev, status]
    );
  }
  const handleStartDateChange = (
    day: Date
  ) => {
    setStartDate(day);
  };

  const handleEndDateChange = (
    day: Date 
  ) => {
    setEndDate(day );
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
      filters.push({
        id: "submission",
        value: { startDate, endDate },
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

  useEffect(() => {
    setAppliedStatuses([...selectedStatuses]);   
  }, [selectedStatuses]);

  useEffect(() => {
    setSelectedStatuses([]);
    setStatusFilter([]);
    setGlobalFilter('');
    setColumnFilters([]);
    setStartDate(undefined);
    setEndDate(undefined);
  }, [pathname, activeTab]);

  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem]">
          <SearchIcon />
          <input
            name="search"
            placeholder="Search"
            type="search"
            value={globalFilter}
            onChange={handleSearchChange}
            className="border-none hover:border-none focus:border-none  w-full focus-visible:outline-none"
          />
        </div>
        <div className="flex gap-2 p-1 items-center w-fit">
          <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
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
                    <div
                      className={`${
                        activeContent === "Status"
                          ? "border-black"
                          : "border-[#0E0F0C1F]"
                      } border w-full rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold`}
                    >
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
                    <div
                      className={`${
                        activeContent === "Date"
                          ? "border-black"
                          : " border-[#0E0F0C1F]"
                      } border w-full rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold`}
                    >
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
                  activeContent === "Status" ? "gap-3" : "justify-between"
                } w-full flex flex-col`}
              >
                {activeContent === "Status" ? (
                  <div className="w-full min-w-[11.25rem] px-4 py-3 flex flex-col gap-8">
                    <ul className="flex flex-col items-start">
                      {statuses.map((status: string) => (
                        <div
                           onMouseEnter={() => {
                              if (!isTouchDevice) handleTickedStatus(status);
                            }}
                            onMouseLeave={() => {
                              if (!isTouchDevice) handleTickedStatus(status); ;
                            }}
                            onClick={() => {
                              handleTickedStatus(status);
                              handleSelectStatus(status);
                            }}
                            className={`flex gap-2 py-2 items-center justify-start w-full text-xs font-[500] ${
                            selectedStatuses.includes(status) || tickedStatuses.includes(status)
                              ? "text-black bg-[#192C8A0D]"
                              : "text-[#6A6C6A]"
                            }`}
                            key={status}  
                        >
                          {selectedStatuses.includes(status) || tickedStatuses.includes(status) ? (
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
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs text-[#6A6C6A]">Start Date</Label>
                        <input
                            name="Start Date"
                            type="date"
                            value={startDate ? formatISODate(startDate) : ""}
                            onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                            className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]"
                            min="1900-01-01"
                            max={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs text-[#6A6C6A]">End Date</Label>
                        <input
                            name="End Date"
                            type="date"
                            value={endDate ? formatISODate(endDate) : ""}
                            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                            className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]"
                            min="1900-01-01"
                            max={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                      </div>
                    </div>
                  )
                )}
                <div className="flex items-center justify-between align-self-end">
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
    </>
  );
}
