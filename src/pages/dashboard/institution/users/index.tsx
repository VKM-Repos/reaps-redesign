import { tableData } from "@/lib/helpers";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import SearchIcon from "@/components/custom/Icons/Search";

import { useGlobalFilter } from "@/context/GlobalFilterContext";
import EmptyRequests from "../../requests/components/empty-state";

import { AddNewUserButton } from "../components/AddNewUserButton";
import { useGET } from "@/hooks/useGET.hook";
import ResearchersTable from "../components/ResearchersTable";
import useUserStore from "@/store/user-store";

export default function Requests() {
  const { activeRole } = useUserStore();
  const [activeTab, setActiveTab] = useState("review users");

  const { globalFilter, setGlobalFilter } = useGlobalFilter();

  const {
    data: users,
    isPending,
    refetch,
  } = useGET({
    url: "users",
    queryKey: ["GET_USERS_IN_USERS_PAGE"],
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };
  console.log(activeTab);

  return (
    <>
      {isPending && <Loader />}
      <div className="flex flex-col gap-12 mb-20 w-full max-w-full ">
        <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
          <h1 className="text-[1.875rem] font-bold">Users</h1>
          {tableData.length > 0 && <AddNewUserButton refetch={refetch} />}
        </div>
        {/* tab */}
        {tableData && tableData.length > 0 ? (
          <div className="flex flex-col gap-4">
            {activeRole === "admin" || activeRole === "super_admin" ? (
              <Tabs
                defaultValue="request users"
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
                      {/* <FilterIcon />
                      <p className="font-semibold text-[#6A6A6B] inter">
                        Filters
                      </p> */}
                    </div>
                  </div>
                </div>
                <TabsContent value="request users">
                  <ResearchersTable
                    usersTableData={
                      users?.items.filter(
                        (user: any) => user.user_type == "user"
                      ) || []
                    }
                    refetch={refetch}
                  />
                </TabsContent>
                <TabsContent value="review users">
                  <ResearchersTable
                    usersTableData={
                      users?.items.filter(
                        (user: any) => user.user_type == "reviewer"
                      ) || []
                    }
                    refetch={refetch}
                  />
                </TabsContent>
                <TabsContent value="admin users">
                  <ResearchersTable
                    usersTableData={
                      users?.items.filter(
                        (user: any) => user.user_type == "admin"
                      ) || []
                    }
                    refetch={refetch}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <ResearchersTable
                usersTableData={
                  users?.items.filter(
                    (user: any) => user.user_type == "user"
                  ) || []
                }
                refetch={refetch}
              />
            )}
          </div>
        ) : (
          <EmptyRequests />
        )}
      </div>
    </>
  );
}
