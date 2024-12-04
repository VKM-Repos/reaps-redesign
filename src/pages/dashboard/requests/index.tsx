import EmptyRequests from "./components/emptystate";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import PageTitle from "./components/PageTitle";
import SeachFilter from "./components/SeachFilter";
import useUserStore from "@/store/user-store";
import ReviewerRequests from "./pages/reviewer";
import { useGET } from "@/hooks/useGET.hook";
import { formatISODate, mapStatus } from "@/lib/utils";
import MyRequestsTable from "./components/table-requests";



export default function Requests() {
  const { activeRole } = useUserStore();
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const [showStatuses, setShowStatuses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<any[]>([]);
  const navigate = useNavigate();


  const { 
    data: transactions,
    isPending: isMyRequestsPending 
  } = useGET({
    url: "transactions",
    queryKey: ["GET_MY_REQUESTS_AS_A_USER"],
  });

  const { 
    data: user,
  } = useGET({
    url: "auth/me",
    queryKey: ["GET_MY_ID"],
  });

  const my_id = user?.id;
  const my_requests = useMemo(() => {
    if (!transactions?.items || !my_id) return [];
    return transactions.items
      .filter((transaction: any) => transaction.request.user.id === my_id)
      .map((transaction: any) => ({
        title: transaction.request.research_title,
        status: mapStatus(transaction.status),
        submission: formatISODate(transaction.request.created_at),
        request: transaction.request,
      }));
  }, [transactions, my_id]);

  
  const handleFunc = () => {
    setLoading(true);
    console.log(showStatuses);
    console.log(appliedStatuses)
    setTimeout(() => {
      navigate("/requests/create");
      setLoading(false);
    }, 5000);
  };

  const requestsStatuses = [
    "Draft",
    "Pending",
    "Approved",
    "Under Review",
    "Declined",
    "Reapproved",
  ];

  useEffect(() => {
    setStatuses(requestsStatuses);
  }, []);


  return (
    <>
    {/* switch between reviewer and researcher based on role */}
    {activeRole === "reviewer" ? (
      <ReviewerRequests />
    ) : (
      <>
        {(loading || 
          isMyRequestsPending) 
          && <Loader />}
        {activeRole !== "admin" 
        && (
          <div className="flex flex-col gap-12 mb-20">
            {/* Page Title and Button */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
              <PageTitle title="Requests" />
              {my_requests?.length > 0 && (
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
  
            {/* Tab and Table */}
            {my_requests?.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <SeachFilter
                    statuses={statuses}
                    setLoading={setLoading}
                    setShowStatuses={setShowStatuses}
                    setAppliedStatuses={setAppliedStatuses}
                  />
                  <div className="lg:flex items-center gap-1 hidden">
                    <span>
                      <a href="#" className="font-semibold underline text-black">
                        The approval process
                      </a>
                    </span>
                    <span>
                      <LinkIcon />
                    </span>
                  </div>
                </div>
                <MyRequestsTable tableData={my_requests || []} />
              </div>
            ) : (
              <EmptyRequests />
            )}
          </div>
        )}
      </>
    )}
  </>
  )
}
  