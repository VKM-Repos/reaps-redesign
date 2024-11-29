// import { reviewTableData, tableData } from "@/lib/helpers";
import TableRequests from "./components/table-requests";
import EmptyRequests from "./components/emptystate";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import PageTitle from "./components/PageTitle";
import SeachFilter from "./components/SeachFilter";
import useUserStore from "@/store/user-store";
import ReviewerRequests from "./pages/reviewer";
import { useGET } from "@/hooks/useGET.hook";

export default function Requests() {
  const { activeRole } = useUserStore();
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const [showStatuses, setShowStatuses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<any[]>([]);
  const navigate = useNavigate();


  const { data: my_requests } = useGET({
    url: "requests/users/me?sort_direction=asc&skip=0&limit=10",
    queryKey: ["GET_MY_REQUESTS_AS_A_USER"],
  });


  
  const handleFunc = () => {
    setLoading(true);
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
    {/* Change tables to completed state */}
    {activeRole === "reviewer" ? (
      <ReviewerRequests />
    ) : (
      <>
        {loading && <Loader />}
        {activeRole !== "admin" && (
          <div className="flex flex-col gap-12 mb-20">
            {/* Page Title and Button */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
              <PageTitle title="Requests" />
              {my_requests?.items.length > 0 && (
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
            {my_requests?.items.length > 0 ? (
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
                <TableRequests tableData={my_requests.items || []} />
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
  