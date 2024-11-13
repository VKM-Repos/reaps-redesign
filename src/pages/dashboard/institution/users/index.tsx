import { adminsTableData, reviewersTableData, tableData } from "@/lib/helpers";
import { useRole } from "@/hooks/useRole";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import SearchIcon from "@/components/custom/Icons/Search";

import { useGlobalFilter } from "@/context/GlobalFilterContext";
import EmptyRequests from "../../requests/components/emptystate";

import FilterIcon from "@/components/custom/Icons/Filter";
import ReviwersTable from "../components/ReviewersTable";
import { AddNewUserButton } from "../components/AddNewUserButton";
import RequesterTable from "../components/RequesterTable";
import AdminsTable from "../components/AdminsTable";
import { useGET } from "@/hooks/useGET.hook";

export default function Requests() {
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState("review users");

  const { globalFilter, setGlobalFilter } = useGlobalFilter();

  const { data: users, isPending } = useGET({
    url: "users",
    queryKey: ["GET_USERS_IN_USERS_PAGE"],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };
  console.log(activeTab);
  console.log(users, ">>>>><<<");

  return (
    <>
      {isPending && <Loader />}
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
                  <TabsTrigger value="admin users">Admins</TabsTrigger>
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
                  <RequesterTable usersTableData={users?.items} />
                </TabsContent>
                <TabsContent value="review users">
                  <ReviwersTable usersTableData={reviewersTableData} />
                </TabsContent>
                <TabsContent value="admin users">
                  <AdminsTable usersTableData={adminsTableData} />
                </TabsContent>
              </Tabs>
            ) : (
              <RequesterTable usersTableData={users?.items} />
            )}
          </div>
        ) : (
          <EmptyRequests />
        )}
      </div>
    </>
  );
}
