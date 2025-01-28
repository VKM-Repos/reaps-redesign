/* eslint-disable @typescript-eslint/no-explicit-any */
import Cancel from "@/components/custom/Icons/Cancel";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import Summary from "../Summary";
import { useLocation } from "react-router-dom";
import { ActionButton } from "./ActionButtons";
import useUserStore from "@/store/user-store";
import { useGET } from "@/hooks/useGET.hook";

export default function InstitutionRequestSummary({
  request,
}: {
  request: any;
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 737px)" });
  const { activeRole } = useUserStore();
  const { pathname } = useLocation();

  const { data: reviews } = useGET({
    url: `reviews/request/${request?.id}`,
    queryKey: ["FETCH_REVIEW_BY_REQUEST_ID", request?.id],
  });

  return (
    <SheetContent side="bottom" className="h-full md:!p-0">
      <div className="mx-auto md:px-10 md:py-2 md:border-t-0 border border-b-[#0C0C0F29] w-full flex justify-between md:justify-unset fixed top-0 z-[9999] bg-inherit">
        <div className={`${isMobile ? "!w-[95%]" : ""} w-full`}>
          <div className="mx-auto flex justify-between md:justify-unset w-[90%]">
            <div className="p-2 w-full">
              <h1 className="text-center font-semibold text-xl md:text-xl2">
                Application Summary
              </h1>
            </div>
          </div>
        </div>
        <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit">
          <Cancel />
        </SheetClose>
      </div>
      {activeRole === "admin" &&
        pathname.includes("/requests/manage-requests") && (
          <div className="fixed bottom-0 right-0 p-8 z-[10000] w-full">
            <ActionButton request={request} />
          </div>
        )}
      <div className="px-4">
        <Summary reviews={reviews?.items} request={request} />
      </div>
    </SheetContent>
  );
}
