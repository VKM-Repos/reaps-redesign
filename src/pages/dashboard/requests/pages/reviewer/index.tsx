import TableRequests from "../../components/table-requests";
import TableReview from "./table";
import EmptyRequests from "../../components/emptystate";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import PageTitle from "../../components/PageTitle";
import SeachFilter from "../../components/SeachFilter";
import { useGET } from "@/hooks/useGET.hook";

export default function ReviewerRequests() {
  const [activeTab, setActiveTab] = useState("request table");
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const [showStatuses, setShowStatuses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<any[]>([]);
  const navigate = useNavigate();
  
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
    data: my_requests, 
    isPending: isMyRequestsPending,
  } = useGET({
    url: "requests/users/me",
    queryKey: ["GET_MY_REQUESTS_AS_A_REVIEWER"],
  });

  const { 
    data: requests_to_review,
    isPending: isReviewRequestsPending
  } = useGET({
    url: "reviews/reviewer",
    queryKey: ["GET_REQUESTS_ASSIGNED_TO_ME"]
  })

  // return requests object to table
  const review_requests_data 
  = requests_to_review?.items.map(
    (request: any) => {
    return {
      title: request.request.research_title,
      applicantName: request.request.user.first_name + ' ' + request.request.user.last_name,
      status: request.status,
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
      {(loading || 
        (isMyRequestsPending || 
        isReviewRequestsPending)) && <Loader />}
        <div className="flex flex-col gap-12 mb-20">
          <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
            <PageTitle title="Requests" />
            {(my_requests?.items.length > 0) || (requests_to_review?.items.length > 0) && (
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
          {/* tab */}
          {(my_requests?.items.length > 0) || (requests_to_review?.items.length > 0) ? (
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
              {/* change tables to completed state  */}
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
                    <TableRequests tableData={my_requests?.items || []} />
                  </TabsContent>
                  <TabsContent value="review table">
                    <TableReview
                      reviewTableData={review_requests_data || []}
                      activeTab={activeTab}                
                    />
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
