import { reviewersTableData, tableData, usersData } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { useRole } from "@/hooks/useRole";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import SearchIcon from "@/components/custom/Icons/Search";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import EmptyRequests from "../../requests/components/emptystate";
import UsersTable from "../components/RequesterTable";
import AddIcon from "@/components/custom/Icons/AddIcon";
import FilterIcon from "@/components/custom/Icons/Filter";
import ReviwersTable from "../components/ReviewersTable";
import { AddNewUserButton } from "../components/AddNewUserButton";
import RequesterTable from "../components/RequesterTable";

type SelectSingleEventHandler = (day: Date | undefined) => void;

export default function Requests() {
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState("review users");
  //   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [loading, setLoading] = useState(false);

  const { globalFilter, setGlobalFilter, setColumnFilters } = useGlobalFilter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  //   const setFilters = () => {
  //     const filters = [];
  //     if (statusFilter && statusFilter.length > 0) {
  //       filters.push({
  //         id: "status", // The column ID
  //         value: statusFilter, // An array of status values ['Draft', 'Pending']
  //       });
  //     }
  //     if (startDate && endDate) {
  //       const formattedStartDate = formatDateToDDMMYYYY(startDate); // convert input date to backend date format
  //       const formattedEndDate = formatDateToDDMMYYYY(endDate);

  //       filters.push({
  //         id: "submission",
  //         value: { formattedStartDate, formattedEndDate },
  //       });
  //     }
  //     setColumnFilters(filters);
  //   };

  //   const applyFilters = () => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setFilters();
  //       setShowStatuses(true);
  //       setAppliedStatuses([...selectedStatuses]);
  //       setOpen(false);
  //       setLoading(false);
  //     }, 3000);
  //   };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-12 mb-20 w-full max-w-full ">
        <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
          <h1 className="text-[1.875rem] font-bold">Users</h1>
          {tableData.length > 0 && <AddNewUserButton />}
        </div>
        {/* tab */}
        {tableData && tableData.length > 0 ? (
          <div className="flex flex-col gap-4">
            {role === "INSTITUTION_ADMIN" ? (
              <Tabs
                defaultValue="review users"
                onValueChange={(val) => setActiveTab(val)}
              >
                <TabsList className="border-b-[1.5px] w-full px-3">
                  <TabsTrigger value="request users">Researchers</TabsTrigger>
                  <TabsTrigger value="review users">Reviewers</TabsTrigger>
                </TabsList>
                <div className="flex items-center justify-between my-5">
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
                      <FilterIcon />
                      <p className="font-semibold text-[#6A6A6B] inter">
                        Filters
                      </p>
                    </div>
                  </div>
                </div>
                <TabsContent value="request users">
                  <RequesterTable usersTableData={usersData} />
                </TabsContent>
                <TabsContent value="review users">
                  <ReviwersTable usersTableData={reviewersTableData} />
                </TabsContent>
              </Tabs>
            ) : (
              <RequesterTable usersTableData={usersData} />
            )}
          </div>
        ) : (
          <EmptyRequests />
        )}
      </div>
    </>
  );
}
