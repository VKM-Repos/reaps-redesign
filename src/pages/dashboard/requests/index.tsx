import { reviewTableData, tableData } from "@/lib/helpers";
import TableRequests from "./components/table-requests";
import TableReview from "./components/table-review";
import EmptyRequests from "./components/emptystate";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import PageTitle from "./components/PageTitle";
import SeachFilter from "./components/SeachFilter";
import useUserStore from "@/store/user-store";

export default function Requests() {
  const { activeRole } = useUserStore();
  const [activeTab, setActiveTab] = useState("request table");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const [showStatuses, setShowStatuses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleFunc = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/requests/create");
      setLoading(false);
    }, 5000);
  };

  const requestsStatuses = ["Draft", "Pending", "Approved", "Under Review", "Declined", "Reapproved"];

  const reviewStatuses = ["Unreviewed", "Reviewed", "Reopened"];

  
  useEffect(() => {
    setStatuses(
      activeTab === "request table" ? requestsStatuses : reviewStatuses
    );
  }, [activeTab]);

  useEffect(() => {
    setStatuses(requestsStatuses)
  }, [])

  const deleteStatusUpdate = (status: String) => {
    setAppliedStatuses((prev) => prev.filter((val) => val !== status));
    if (appliedStatuses.length === 0) {
      setShowStatuses(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-12 mb-20">
        <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
          <PageTitle title="Requests" />
          {tableData.length > 0 && (
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
        {tableData && tableData.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
            <SeachFilter statuses={statuses} activeTab={activeTab} setLoading={setLoading} setShowStatuses={setShowStatuses} setAppliedStatuses={setAppliedStatuses}/>
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
                      <X size={10}  />
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* change tables to completed state  */}
            {activeRole === 'reviewer' ? (
              <Tabs
                defaultValue="request table"
                onValueChange={(val) => setActiveTab(val)}
              >
                <TabsList className="border-b-[1.5px] w-full px-3">
                  <TabsTrigger value="request table">My request</TabsTrigger>
                  <TabsTrigger value="review table">Review request</TabsTrigger>
                </TabsList>

                <TabsContent value="request table">
                  <TableRequests tableData={tableData} />
                </TabsContent>
                <TabsContent value="review table">
                  <TableReview reviewTableData={reviewTableData} activeTab={activeTab}/>
                </TabsContent>
              </Tabs>
            ) : (
              <TableRequests tableData={tableData} />
            )}
          </div>
        ) : (
          <EmptyRequests />
        )}
      </div>
    </>
  );
}
