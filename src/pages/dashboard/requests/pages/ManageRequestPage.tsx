import { institutionTableData } from "@/lib/helpers";
import PageTitle from "../components/PageTitle";
import SeachFilter from "../components/SeachFilter";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import ManageRequests from "../components/manage-requests";
import { useMediaQuery } from "react-responsive";
import { X } from "lucide-react";
import { useGET } from "@/hooks/useGET.hook";

export default function ManageRequestPage() {
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [showStatuses, setShowStatuses] = useState(false);
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const handleFunc = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/requests/create");
      setLoading(false);
    }, 5000);
  };
  const manageStatuses = ["Awaiting", "Reviewed", "Assigned", "In Progress"];

  const deleteStatusUpdate = (status: string) => {
    setAppliedStatuses((prev) => prev.filter((val) => val !== status));
    if (appliedStatuses.length === 0) {
      setShowStatuses(false);
    }
  };
  const { data: requests } = useGET({
    url: "requests",
    queryKey: ["GET_REQUEST_MANAGE_REQUEST_PAGE"],
  });
  console.log(requests, "?????");

  useEffect(() => {
    setStatuses(manageStatuses);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div>
        <div className="flex md:flex-row flex-col gap-5 md:gap-auto justify-between md:items-center justify-between mx-auto w-full">
          <PageTitle title="Manage Request" />
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
        {isMobile && showStatuses && appliedStatuses.length !== 0 && (
          <div className="flex flex-wrap justify-center items-center p-4 gap-3">
            {appliedStatuses.map((status) => (
              <div className="py-2 px-3 border border-[#0C0C0F29] rounded-[0.625rem] flex items-center justify-start gap-2 w-full max-w-fit">
                <span className="w-[6px] h-[5px] bg-[#FFD13A] rounded-full"></span>
                <span className="text-xs font-semibold text-[#0C0D0F] w-full min-w-fit flex text-wrap">
                  {status}
                </span>
                <span onClick={() => deleteStatusUpdate(status)}>
                  <X size={10} />
                </span>
              </div>
            ))}
          </div>
        )}
        <ManageRequests institutionTableData={institutionTableData} />
      </div>
    </>
  );
}
