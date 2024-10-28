import { tableData } from "@/lib/helpers";
import TableRequests from "./components/table-requests";
import PageTitle from "./components/PageTitle";
import SeachFilter from "./components/SeachFilter";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";

export default function MyRequest() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFunc = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/requests/create");
      setLoading(false);
    }, 5000);
  };
  console.log(loading);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <PageTitle title="My requests" />
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
            <SeachFilter />
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
          <TableRequests tableData={tableData} />
        </div>
      )}
    </>
  );
}
