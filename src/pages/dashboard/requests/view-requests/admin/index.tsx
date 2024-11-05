import Cancel from "@/components/custom/Icons/Cancel";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import Summary from "../Summary";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRequestsStore } from "@/store/RequestFormStore";
import Loader from "@/components/custom/Loader";
import { useRole } from "@/hooks/useRole";
import { ActionButton } from "./ActionButtons";
// import useUserStore from "@/store/user-store";

// view requests should be specific to each table id
// view should receive and store these values based on id
// store an array of reviewers
// store the review specific to the request
// assign reviewer popover, write review popover and then final review



export default function InstitutionRequestSummary() {
  const isMobile = useMediaQuery({ query: "(max-width: 737px)" });
  // const { activeRole } = useUserStore();
  const { role } = useRole();
  const { pathname } = useLocation();
  const [loading, setLoader] = useState(false);
  const { reviewer, success, setReviewer, setSuccess } = useRequestsStore();

  const closeDialog = () => {
      setSuccess(false);
      setReviewer({ firstName: '', lastName: '' }); // Reset reviewer when closing
  };


  return (
    <> 
   
     {reviewer &&
        <Dialog open={success && reviewer?.firstName !== ''} >
          <DialogContent className="w-full max-w-[20rem] pt-6 pb-2 px-4 flex flex-col items-center gap-[2.25rem]" showCloseButton={false}>
              <h1 className="text-center font-bold text-[1.625rem]">Assigned</h1>
              <p className="text-sm text-center">Reviewer ({reviewer.firstName} {reviewer.lastName}) has been assigned to this request</p>
                  <DialogClose onClick={closeDialog} className="bg-primary rounded text-white font-semibold py-3 px-6 w-full max-w-[8rem]">Done</DialogClose>
          </DialogContent>
      </Dialog>
      }
    <SheetContent side="bottom" className="h-full md:!p-0">
    {loading && <Loader />}
      <div className="mx-auto md:px-10 md:py-2 md:border-t-0 border border-b-[#0C0C0F29] w-full flex justify-between md:justify-unset fixed top-0 z-[9999] bg-inherit">
        <div
          className={`${
            isMobile ? "border border-[#0C0C0F29] !w-[95%]" : ""
          } w-full`}
        >
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
      {role === "INSTITUTION_ADMIN" && pathname.includes('/requests/manage-requests') && <ActionButton setLoader={setLoader}/>}
      <div className="px-4">
        <Summary />
      </div>
    </SheetContent>
 
    </> );
   
}

