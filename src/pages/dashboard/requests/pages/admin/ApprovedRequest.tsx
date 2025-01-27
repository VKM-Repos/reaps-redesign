import PageTitle from "../../components/PageTitle";
// import SeachFilter from "../../components/SeachFilter";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";

import ReviewerRequestTable from "../../components/request-tables/reviewer";

export default function ApprovedRequest() {
  const [loading, setLoading] = useState(false);
  // const [statuses, setStatuses] = useState<string[]>([]);
  // const [showStatuses, setShowStatuses] = useState(false);
  // const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const navigate = useNavigate();
  // const reviewStatuses = ["Unreviewed", "Reviewed", "Reopened"];

  const { data: approved_requuest, isPending: fetching_approved_request } =
    useGET({
      url: "approved-requests",
      queryKey: ["GET_APPROVED_REQUESTS"],
    });

  const review_requests_data = approved_requuest?.map((request: any) => {
    return {
      id: request.id,
      research_title: request.request.research_title,
      fullName:
        request.request.user.first_name + " " + request.request.user.last_name,
      status: request.status,
      created_at: request.request.created_at,
      request: request.request,
    };
  });

  const handleFunc = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/requests/create");
      setLoading(false);
    }, 5000);
  };

  // useEffect(() => {
  //   setStatuses(reviewStatuses);
  // }, []);

  return (
    <>
      {(loading || fetching_approved_request) && <Loader />}
      <div>
        <div className="flex md:flex-row flex-col gap-5 md:gap-auto justify-between md:items-center justify-between mx-auto w-full">
          <PageTitle title="Approved Request" />
          <Button
            onClick={handleFunc}
            className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"
          >
            <span>
              <GoogleDoc />
            </span>
            Request Ethical Approval
          </Button>
        </div>
        <div className="flex items-center justify-between mt-12 mb-4">
          {/* <SeachFilter
            statuses={statuses}
            setLoading={setLoading}
            setShowStatuses={setShowStatuses}
            setAppliedStatuses={setAppliedStatuses}
          /> */}
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
        <ReviewerRequestTable data={review_requests_data || []} />
      </div>
    </>
  );
}
