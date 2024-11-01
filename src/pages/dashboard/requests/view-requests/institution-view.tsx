import Cancel from "@/components/custom/Icons/Cancel";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import Summary from "./Summary";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AssignReviewer from "../components/AssignReviewer";
import { useLocation } from "react-router-dom";
import ArrowRight from "@/components/custom/Icons/ArrowRight";
import useUserStore from "@/store/user-store";
import WriteReview from "../components/WriteReview";
import { useRequestsStore } from "@/store/RequestFormStore";
import Loader from "@/components/custom/Loader";

const actions = [
  {
    id: "1",
    text: "Assign",
    color: "#FFAD3A",
    content: <AssignReviewer />
  }, 
  {
    id: "2",
    text: "Review",
    color: "#BD6BC9",
    content: <WriteReview />
  }, 
  {
    id: "3",
    text: "Final Review",
    color: "#566DBE" 
  }
]

// assign reviewer popover, write review popover and then final review

const ActionButton = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepForward = (index: number) => {
    if (index === currentStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

   return (
       <div className='fixed bottom-0 right-0 p-8 z-[10000] w-full'>
        <div className="flex flex-col gap-3 w-full items-end">
          {showButtons && 
          <div className='flex flex-col gap-5 items-end w-full'>
            {actions.map(({text, color, content}, index) => (
              <Dialog key={index}>
                <DialogTrigger>
                  <button className="bg-white action-shadow rounded-[2.75rem] px-6 py-[1.375rem] font-semibold max-w-fit"
                   onClick={() => handleStepForward(index)}
                  //  disabled={index > currentStep}
                   style={{
                    color: color,
                    backgroundColor: index === 2 && currentStep >= 3 ? '#14155E' : ''
                  }}>
                    {text}
                  </button>
                </DialogTrigger>
                <DialogContent className='fixed !w-full !max-w-[80%] h-[90%] mx-auto'>
                  {content}
                </DialogContent>
              </Dialog>
             
            ))}
          </div>}
          <button className="max-w-fit text-white flex items-center gap-3 px-6 py-[1.375rem] action-shadow rounded-[2.75rem] border border-4 border-[#FFD13A] bg-primary" onClick={() => setShowButtons((prev) => !prev)}><span className="font-semibold">Action</span><span className="rounded-[36px] border border-white w-6 h-6 "><span className={`${!showButtons ? 'rotate-90' : 'rotate-270'} flex items-center`}><ArrowRight /></span></span></button>
        </div>
       </div>
   )
}


export default function InstitutionRequestSummary() {
  const isMobile = useMediaQuery({ query: "(max-width: 737px)" });
  const { activeRole } = useUserStore();
  const { pathname } = useLocation();
  const { loading } = useRequestsStore();

  return (
    <> 
    {loading && <Loader />}
    <SheetContent side="bottom" className="h-full md:!p-0">
      <div className="mx-auto md:px-10 md:py-2 md:border-t-0 border border-b-[#0C0C0F29] w-full  flex justify-between md:justify-unset fixed top-0 z-[9999] bg-inherit">
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
      {activeRole === 'admin' && pathname.includes('/requests/manage-requests') && <ActionButton />}
      <div className="px-4">
        <Summary />
      </div>
    </SheetContent>
 
    </> );
   
}

