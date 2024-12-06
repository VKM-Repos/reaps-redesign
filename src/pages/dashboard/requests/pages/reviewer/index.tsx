import EmptyRequests from "../../components/emptystate";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import PageTitle from "../../components/PageTitle";
import SeachFilter from "../../components/SeachFilter";
import { useGET } from "@/hooks/useGET.hook";
import MyRequestsTable from "../../components/table-requests";
import ReviewRequestsTable from "./table";
import { formatISODate, mapStatus } from "@/lib/utils";
import useUserStore from "@/store/user-store";

export default function ReviewerRequests() {
  const [activeTab, setActiveTab] = useState("request table");
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const [showStatuses, setShowStatuses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useUserStore();
  
  const requestsStatuses = [
    "Draft",
    "Pending",
    "Approved",
    "Under Review",
    "Declined",
    "Reapproved",
  ];

  const reviewStatuses = [
    "Unreviewed", 
    "Reviewed", 
    "Reopened"
];

const { 
  data: transactions,
  isPending: isMyRequestsPending 
} = useGET({
  url: "transactions",
  queryKey: ["GET_MY_REQUESTS_AS_A_REVIEWER"],
});


const { 
  data: requests_to_review,
  isPending: isReviewRequestsPending
} = useGET({
  url: "reviews/reviewer",
  queryKey: ["GET_REQUESTS_ASSIGNED_TO_ME"]
})

const my_requests = useMemo(() => {
  if (!transactions?.items || !user?.id) return [];
  return transactions.items
    .filter((transaction: any) => transaction.request?.user.id === user?.id)
    .map((transaction: any) => ({
      title: transaction.request.research_title,
      status: mapStatus(transaction.status),
      submission: formatISODate(transaction.request.created_at),
      request: transaction.request,
    }));
}, [transactions, user?.id]);



 

 
  
  
  // return requests object to table
  const review_requests_data 
  = requests_to_review?.items.map(
    (request: any) => {
    return {
      id: request.id,
      title: request.request.research_title,
      applicantName: request.request.user.first_name + ' ' + request.request.user.last_name,
      status: mapStatus(request.status),
      submission: formatISODate(request.request.created_at),
      request: request.request
    }
  })


  const handleFunc = () => {
    setLoading(true);
    console.log(showStatuses);
    console.log(appliedStatuses)
    setTimeout(() => {
      navigate("/requests/create");
      setLoading(false);
    }, 5000);
  };

  useEffect(() => {
    setStatuses(
      activeTab === "request table" ? 
      requestsStatuses : 
      reviewStatuses
    );
  }, [activeTab]);

  useEffect(() => {
    setStatuses(requestsStatuses);
  }, []);

  return (
    <>
      {loading && <Loader />}
        <div className="flex flex-col gap-12 mb-20">
          {/* Page title and button */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
            <PageTitle title="Requests" />
            {(my_requests?.length > 0) && (
              <Button
                onClick={handleFunc}
                className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"
              >
                <span>
                  <GoogleDoc />
                </span>
                Request Ethical Approval
              </Button>
            )}            
          </div>


          {/* Search and Filter components */}
          {(my_requests?.length > 0) || (review_requests_data?.length > 0) ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <SeachFilter
                  statuses={statuses}
                  activeTab={activeTab}
                  setLoading={setLoading}
                  setShowStatuses={setShowStatuses}
                  setAppliedStatuses={setAppliedStatuses}
                />
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
              </div>


              {/* Requests table tabs  */}
                <Tabs
                  defaultValue="request table"
                  onValueChange={(val) => setActiveTab(val)}
                >
                  <TabsList className="border-b-[1.5px] w-full px-3">
                    <TabsTrigger value="request table">My request</TabsTrigger>
                    <TabsTrigger value="review table">
                      Review request
                    </TabsTrigger>
                  </TabsList>
                    <TabsContent value="request table">
                      {isMyRequestsPending ? (
                        <Loader />
                      ) : (
                        <MyRequestsTable tableData={my_requests || []} />
                      )}
                    </TabsContent>
                    <TabsContent value="review table">
                      {isReviewRequestsPending ? (
                        <Loader />
                      ) : (
                        <ReviewRequestsTable reviewTableData={review_requests_data || []} activeTab={activeTab}/>
                      )}
                    </TabsContent>
                </Tabs>
            </div>
          ) : (
            <EmptyRequests setActiveTab={setActiveTab}/>
          )}
        </div>
    </>
  );
}
