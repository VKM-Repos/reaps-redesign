import PageTitle from "../../components/PageTitle";
import SeachFilter from "../../components/SeachFilter";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import ReviewRequestsTable from "../reviewer/table";

export default function ReviewRequest() {
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([])
  const [showStatuses, setShowStatuses] = useState(false);
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const navigate = useNavigate();
  const reviewStatuses = ["Unreviewed", "Reviewed", "Reopened"];

  const { 
    data: requests_to_review, 
    isPending: isRequestsPending 
  } = useGET({
    url: "reviews/reviewer",
    queryKey: ["GET_REQUESTS_ASSIGNED_TO_ME"]
  })

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
    setStatuses(reviewStatuses);
  }, [])



  return (
    <>
      {(loading || isRequestsPending) &&
        <Loader />}
        <div>
          <div className="flex md:flex-row flex-col gap-5 md:gap-auto justify-between md:items-center justify-between mx-auto w-full">
            <PageTitle title="Review Request" />
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
            <SeachFilter 
              statuses={statuses} 
              setLoading={setLoading} 
              setShowStatuses={setShowStatuses} 
              setAppliedStatuses={setAppliedStatuses}/>
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
          <ReviewRequestsTable reviewTableData={review_requests_data || []} />
        </div>
    </>
  );
}
