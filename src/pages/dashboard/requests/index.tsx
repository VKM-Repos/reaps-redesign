import { useEffect, useState } from "react";
import Loader from "@/components/custom/Loader";
import SeachFilter from "./components/SeachFilter";
import useUserStore from "@/store/user-store";
import { useGET } from "@/hooks/useGET.hook";
import RequestLayout from "./components/request-layout";
import RequestTable from "./components/request-tables";
import ReviewerRequestTable from "./components/request-tables/reviewer";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { cn } from "@/lib/utils";

export default function Requests() {
  const [activeTab, setActiveTab] = useState("my_request");
  const [, setAppliedStatuses] = useState<string[]>([]);
  const [, setLoading] = useState(false);
  const [, setShowStatuses] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const { user } = useUserStore();

  const tabFetchUrls: Record<string, string | null> = {
    my_request: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Payment Confirmed`,
    drafts: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Not Submitted Yet`,
    reopened: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Re Opened`,
    review_request: `reviews/reviewer`,
  };

  const { data, isPending, refetch } = useGET({
    url: tabFetchUrls[activeTab]!,
    queryKey: ["FETCH_REQUESTS", activeTab],
    enabled: !!tabFetchUrls[activeTab],
  });

  useEffect(() => {
    setStatuses([
      "Not Submitted Yet",
      "Submitted",
      "Re Opened",
      "Not Yet Reviewed",
      "Declined",
      "Satisfactory",
      "Approved",
      "Closed",
    ]);
    refetch();
  }, [activeTab]);

  const tabTriggerClass = cn(
    "relative py-1 px-4 text-[1.1rem] font-semibold transition-all whitespace-nowrap",
    "data-[state=active]:text-[#000066] data-[state=active]:font-bold",
    "data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0",
    "data-[state=active]:after:bottom-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#000066]",
    "data-[state=active]:after:transition-transform data-[state=active]:after:duration-300",
    "data-[state=active]:after:scale-x-100 after:scale-x-0"
  );

  // Map data for the reviewer tab
  const reviewRequests =
    (data &&
      data?.items.map((item: any) => ({
        id: item?.id,
        research_title: item?.request?.research_title || "N/A",
        fullName: `${item?.request?.user?.first_name || ""} ${
          item?.request?.user?.last_name || ""
        }`,
        status: item?.status,
        created_at: item?.request?.created_at,
        request: item?.request,
      }))) ||
    [];

  const requestItems =
    (data &&
      data?.items.map((item: any) => ({
        id: item?.id,
        research_title: item?.research_title || "N/A",
        fullName: `${item?.user?.first_name || ""} ${
          item?.user?.last_name || ""
        }`,
        status: item?.status,
        created_at: item?.created_at,
        request: item,
      }))) ||
    [];

  const normalizedData =
    activeTab === "review_request" ? reviewRequests : requestItems;

  return (
    <RequestLayout
      setActiveTab={setActiveTab}
      data={normalizedData || []}
      filters={
        <SeachFilter
          statuses={statuses}
          setLoading={setLoading}
          setShowStatuses={setShowStatuses}
          setAppliedStatuses={setAppliedStatuses}
        />
      }
      tab_header={
        <TabsList className="border-b-[1px] w-full">
          <TabsTrigger
            className={tabTriggerClass}
            value="my_request"
            onClick={() => setActiveTab("my_request")}
          >
            My requests
          </TabsTrigger>
          <TabsTrigger
            className={tabTriggerClass}
            value="drafts"
            onClick={() => setActiveTab("drafts")}
          >
            Drafts
          </TabsTrigger>
          <TabsTrigger
            className={tabTriggerClass}
            value="reopened"
            onClick={() => setActiveTab("reopened")}
          >
            Re-Opened
          </TabsTrigger>
          {user?.user_type === "reviewer" && (
            <TabsTrigger
              className={tabTriggerClass}
              value="review_request"
              onClick={() => setActiveTab("review_request")}
            >
              Review requests
            </TabsTrigger>
          )}
        </TabsList>
      }
    >
      <TabsContent value="my_request">
        {isPending ? <Loader /> : <RequestTable data={normalizedData || []} />}
      </TabsContent>
      <TabsContent value="drafts">
        {isPending ? <Loader /> : <RequestTable data={normalizedData || []} />}
      </TabsContent>
      <TabsContent value="reopened">
        {isPending ? <Loader /> : <RequestTable data={normalizedData || []} />}
      </TabsContent>
      <TabsContent value="review_request">
        {isPending ? (
          <Loader />
        ) : (
          <ReviewerRequestTable data={normalizedData} />
        )}
      </TabsContent>
    </RequestLayout>
  );
}
