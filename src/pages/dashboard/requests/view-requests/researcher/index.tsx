import Cancel from "@/components/custom/Icons/Cancel";
import StatusTracker from "./StatusTracker";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import Summary from "../Summary";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useMediaQuery } from "react-responsive";
import ArrowRight from "@/components/custom/Icons/ArrowRight";
import { RequestItems } from "@/types/requests";

const statuses = [
  "Request Submitted",
  "Payment Confirmed",
  "Assigned to a Reviewer",
  "Review in Progress",
  "Approval",
];

export default function ResearcherRequestSummary({
  request,
}: {
  request: RequestItems;
}) {
  const summaryRef = useRef<HTMLDivElement>(null);

  const handleSummaryPrint = useReactToPrint({
    contentRef: summaryRef,
  });

  const currentStatus: string = "Payment Confirmed";
  const isApproval = currentStatus === "Approval";
  const currentIndex = statuses.indexOf(currentStatus);
  const [showTracker, setShowTracker] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 737px)" });

  return (
    <SheetContent side="bottom" className="h-full overflow-y-scroll md:!p-0">
      {showTracker && isMobile ? (
        <StatusTracker
          currentIndex={currentIndex}
          currentStatus={currentStatus}
          isApproval={isApproval}
          statuses={statuses}
          handlePrint={handleSummaryPrint}
          setShowTracker={setShowTracker}
        />
      ) : (
        <div className="w-full relative" ref={summaryRef}>
          {!isMobile && (
            <StatusTracker
              currentIndex={currentIndex}
              currentStatus={currentStatus}
              isApproval={isApproval}
              statuses={statuses}
              handlePrint={handleSummaryPrint}
              setShowTracker={setShowTracker}
            />
          )}
          <div className="mx-auto md:border-t-0 w-full">
            <div
              className={`${
                isMobile ? "border border-[#0C0C0F29] !w-[95%]" : ""
              } md:fixed md:top-0 md:border-b md:bg-white z-40  w-full mx-auto flex justify-between md:justify-unset`}
            >
              <div className="p-2 w-full">
                <h1 className="text-center font-semibold text-xl md:text-xl2">
                  Your application Summary
                </h1>
              </div>
              <SheetClose className="md:absolute md:right-10 top-2 md:mt-0 mt-1 bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit">
                <Cancel />
              </SheetClose>
            </div>
            {isMobile && (
              <div
                className="flex items-center text-[#192C8A] py-3 w-[95%] mx-auto"
                onClick={() => {
                  setShowTracker(true);
                }}
              >
                <p>View Status Tracker</p>
                <div className="flex items-center">
                  <ArrowRight />
                </div>
              </div>
            )}
            <div className="mx-auto my-0 md:absolute md:right-0 md:w-10/12">
              <div className="w-[85%] mx-auto">
                <Summary
                  reviews={[]}
                  request={request}
                  isApproval={isApproval}
                  handlePrint={handleSummaryPrint}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </SheetContent>
  );
}
