/* eslint-disable @typescript-eslint/no-explicit-any */
import PageTitle from "@/components/custom/PageTitle";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import TableWrapper from "@/components/custom/TableWrapper";
import SearchGlobal from "@/components/custom/SearchGlobal";
import FilterGlobal from "@/components/custom/FilterGlobal";
import { TransitionElement } from "@/lib/transitions";
import { useEffect, useState } from "react";
import RequestTable from "./components/request-tables";
import useUserStore from "@/store/user-store";
import ReviewerRequestTable from "./components/request-tables/reviewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";

export default function MyRequest() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [activeTab, setActiveTab] = useState("my_request");
  const [filters, setFilters] = useState<string[]>([]);

  const tabUrls: Record<string, string> = {
    my_request: `requests/users/me`,
    review_request: `reviews/reviewer?sort_direction=asc&skip=0&limit=100`,
  };

  const statusUrls: Record<string, string> = {
    all: "?sort_direction=asc&skip=0&limit=100",
    submitted: "?sort_direction=asc&skip=0&limit=100&status=Payment Confirmed",
    not_submitted_yet:
      "?sort_direction=asc&skip=0&limit=100&status=Not Submitted Yet",
    under_review:
      "?sort_direction=asc&skip=0&limit=100&status=Review in Progress",
    reopened: "?sort_direction=asc&skip=0&limit=100&status=Re Opened",
  };

  const getActiveUrl = () => {
    const baseUrl = tabUrls[activeTab];
    if (!baseUrl) {
      console.error(`No URL found for activeTab: ${activeTab}`);
      return "";
    }

    // Apply status filter only for the "my_request" tab
    if (activeTab === "my_request") {
      const statusKey = filters[0]?.toLowerCase().replace(/ /g, "_");
      const statusFilter = statusKey && statusUrls[statusKey];

      // Append the status filter to the base URL, if it exists
      return statusFilter ? `${baseUrl}${statusFilter}` : baseUrl;
    }

    // Return the base URL for other tabs
    return baseUrl;
  };

  const { data, isPending, refetch } = useGET({
    url: getActiveUrl(),
    queryKey: ["FETCH_REQUESTS", activeTab, filters],
    enabled: !!tabUrls[activeTab],
  });

  const applyFilters = (filters: { statuses: string[] }) => {
    setFilters(filters.statuses);
  };

  useEffect(() => {
    refetch();
  }, [activeTab, filters]);

  const requestItems =
    data?.items.map((item: any) => ({
      id: item?.id,
      research_title: item?.research_title || "N/A",
      fullName: `${item?.user?.first_name || ""} ${
        item?.user?.last_name || ""
      }`,
      status: item?.status,
      created_at: item?.created_at,
      expiration_date: item?.expiration_date,
      request: item,
    })) || [];

  const reviewRequests =
    data?.items.map((item: any) => ({
      id: item?.id,
      research_title: item?.request?.research_title || "N/A",
      fullName: `${item?.request?.user?.first_name || ""} ${
        item?.request?.user?.last_name || ""
      }`,
      email: item?.request?.user.email,
      created_at: item?.request?.created_at,
      request: item?.request,
      all: item,
    })) || [];

  return (
    <TransitionElement>
      <div className="space-y-12">
        <PageTitle
          title="My Requests"
          actions={
            <Button
              onClick={() => navigate("/requests/create")}
              className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"
            >
              <GoogleDoc />
              Request Ethical Approval
            </Button>
          }
        />
        {user?.user_type === "reviewer" ? (
          <Tabs defaultValue="my_request" className="w-full space-y-4">
            <TabsList className="border-b-[1px] w-full">
              <TabsTrigger
                value="my_request"
                onClick={() => setActiveTab("my_request")}
              >
                My requests
              </TabsTrigger>
              <TabsTrigger
                value="review_request"
                onClick={() => setActiveTab("review_request")}
              >
                Review requests
              </TabsTrigger>
            </TabsList>

            <TableWrapper
              search={<SearchGlobal />}
              filter={
                activeTab === "my_request" && (
                  <FilterGlobal
                    statuses={Object.keys(statusUrls).map((status) =>
                      status.replace(/_/g, " ")
                    )}
                    onApplyFilters={applyFilters}
                  />
                )
              }
              actions={
                <div className="lg:flex items-center gap-1 hidden">
                  <span>
                    <a href="" className="font-semibold underline text-black">
                      The approval process
                    </a>
                  </span>
                  <span>
                    <LinkIcon />
                  </span>
                </div>
              }
            >
              <TabsContent
                className="w-full flex items-center justify-center"
                value="my_request"
              >
                {isPending ? <Loader /> : <RequestTable data={requestItems} />}
              </TabsContent>
              <TabsContent
                className="w-full flex items-center justify-center"
                value="review_request"
              >
                {isPending ? (
                  <Loader />
                ) : (
                  <ReviewerRequestTable data={reviewRequests} />
                )}
              </TabsContent>
            </TableWrapper>
          </Tabs>
        ) : (
          <TableWrapper
            search={<SearchGlobal />}
            filter={
              activeTab === "my_request" && (
                <FilterGlobal
                  statuses={Object.keys(statusUrls).map((status) =>
                    status.replace(/_/g, " ")
                  )}
                  onApplyFilters={applyFilters}
                />
              )
            }
          >
            {isPending ? <Loader /> : <RequestTable data={requestItems} />}
          </TableWrapper>
        )}
      </div>
    </TransitionElement>
  );
}
