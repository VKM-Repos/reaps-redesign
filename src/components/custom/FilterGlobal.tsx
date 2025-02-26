import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import FilterIcon from "./Icons/Filter";
import ArrowRight from "./Icons/ArrowRight";
import Tick from "./Icons/Tick";
// import { Label } from "../ui/label";

type Props = {
  statuses: string[]; // Available statuses
  onApplyFilters: (filters: {
    statuses: string[];
    startDate?: Date;
    endDate?: Date;
  }) => void;
};

const FilterGlobal: React.FC<Props> = ({ statuses, onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<"Status" | "Date">(
    "Status"
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  // const [startDate, setStartDate] = useState<Date | undefined>();
  // const [endDate, setEndDate] = useState<Date | undefined>();

  const handleSelectStatus = (status: string) => {
    setSelectedStatuses([status]); // Allow only one selected status
  };

  const applyFilters = () => {
    onApplyFilters({ statuses: selectedStatuses });
    setOpen(false); // Close the dropdown after applying filters
  };

  // const handleStartDateChange = (date: Date) => setStartDate(date);
  // const handleEndDateChange = (date: Date) => setEndDate(date);

  return (
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
            {/* Status Filter */}
            <div className="gap-2 flex flex-col justify-center">
              <p className="font-semibold text-sm text-[#6A6C6A] px-1">
                Status
              </p>
              <button onClick={() => setActiveContent("Status")}>
                <div
                  className={`${
                    activeContent === "Status"
                      ? "border-black"
                      : "border-[#0E0F0C1F]"
                  } border w-full rounded-lg flex justify-between items-center hover:border-black focus-visible:border-black p-[0.375rem] text-xs text-[#6A6C6A] font-semibold`}
                >
                  <span className="capitalize">
                    {selectedStatuses.length > 0
                      ? `${selectedStatuses}`
                      : "Show All"}
                  </span>
                  <span>
                    <ArrowRight />
                  </span>
                </div>
              </button>
            </div>

            {/* Date Filter */}
            {/* <div className="gap-2 flex flex-col justify-center">
              <p className="font-semibold text-sm text-[#6A6C6A] px-1">Date</p>
              <button onClick={() => setActiveContent("Date")}>
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
            </div> */}
          </div>
          <div className="border-l-[#0E0F0C1F] border"></div>

          {/* Active Content */}
          <div
            className={`${
              activeContent === "Status" ? "gap-3" : "justify-between"
            } w-full flex flex-col`}
          >
            {activeContent === "Status" ? (
              // Status List
              <div className="w-full min-w-[11.25rem] px-4 py-3 flex flex-col gap-8">
                <ul className="flex flex-col items-start">
                  {statuses.map((status) => (
                    <div
                      onClick={() => handleSelectStatus(status)}
                      className={`flex gap-2 py-2 items-center justify-start w-full text-xs font-medium capitalize cursor-pointer ${
                        selectedStatuses.includes(status)
                          ? "text-black bg-[#192C8A0D]"
                          : "text-[#6A6C6A]"
                      }`}
                      key={status}
                    >
                      {selectedStatuses.includes(status) ? (
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
              // Date Range
              activeContent === "Date" && (
                // <div className="gap-2 flex flex-col justify-center">
                //   <div className="flex gap-3 items-center">
                //     <div className="flex flex-col gap-1">
                //       <Label className="text-xs text-[#6A6C6A]">
                //         Start Date
                //       </Label>
                //       <input
                //         type="date"
                //         value={
                //           startDate ? startDate.toISOString().split("T")[0] : ""
                //         }
                //         onChange={(e) =>
                //           handleStartDateChange(new Date(e.target.value))
                //         }
                //         className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]"
                //       />
                //     </div>
                //     <div className="flex flex-col gap-1">
                //       <Label className="text-xs text-[#6A6C6A]">End Date</Label>
                //       <input
                //         type="date"
                //         value={
                //           endDate ? endDate.toISOString().split("T")[0] : ""
                //         }
                //         onChange={(e) =>
                //           handleEndDateChange(new Date(e.target.value))
                //         }
                //         className="border border-[#0E0F0C1F] rounded-lg p-2 text-xs text-[#6A6C6A] w-full min-w-[5.5rem]"
                //       />
                //     </div>
                //   </div>
                // </div>
                <></>
              )
            )}
            {/* Action Buttons */}
            <div className="flex items-center gap-3 align-self-end">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={applyFilters}>Apply</Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="font-semibold text-[#6A6A6B] inter">Filters</p>
    </div>
  );
};

export default FilterGlobal;
