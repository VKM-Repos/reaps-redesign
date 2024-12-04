import CircleArrowDown from "@/assets/circle-arrow-down-01.svg";
import AssignReviewer from "../../components/AssignReviewer";
import WriteReview from "../../components/WriteReview";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import Smile from "@/assets/smile.svg";
import Unhappy from "@/assets/unhappy.svg";
import Unamused from "@/assets/unamused.svg";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";


const final_review_remarks = [
  { id: "1", text: "Approved", color: "#34A853", icon: Smile },
  { id: "2", text: "Declined", color: "#D03238", icon: Unhappy },
  { id: "3", text: "Re Opened", color: "#608FEB", icon: Unamused },
];

export const ActionButton = ({
  request,
}: {
  request: any;
  setLoader: (loading: boolean) => void;
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleStepForward = (index: number) => {
    if (index === currentStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const actions = [
    {
      id: "1",
      text: "Assign",
      color: "#FFAD3A",
      content: <AssignReviewer request={request} />,
    },
    {
      id: "3",
      text: "Final Review",
      color: "#566DBE",
      content: (
        <WriteReview
            closeDialog={()=>{} }
          request={request}
          remarks={final_review_remarks}
          buttonText="Submit final review"
        />
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 right-0 p-8 z-[10000] w-full">
      <div className="flex flex-col gap-3 w-full items-end">
        {showButtons && (
          <div className="flex flex-col gap-5 items-end w-full">
            {actions.map(({ text, color, content }, index) =>
              isMobile ? (
                <Dialog key={index}>
                  <DialogTrigger>
                    <button
                      className="bg-white action-shadow rounded-[2.75rem] px-6 py-[1.375rem] font-semibold max-w-fit"
                      onClick={() => handleStepForward(index)}
                      //  disabled={index > currentStep}
                      style={{
                        color:
                          index === 2 && currentStep >= 3 ? "white" : color,
                        backgroundColor:
                          index === 2 && currentStep >= 3 ? "#14155E" : "",
                      }}
                    >
                      {text}
                    </button>
                  </DialogTrigger>
                  {content}
                </Dialog>
              ) : (
                <Sheet key={index}>
                  <SheetTrigger>
                    <button
                      className="bg-white action-shadow rounded-[2.75rem] px-6 py-[1.375rem] font-semibold max-w-fit"
                      onClick={() => handleStepForward(index)}
                      //  disabled={index > currentStep}
                      style={{
                        color:
                          index === 2 && currentStep >= 3 ? "white" : color,
                        backgroundColor:
                          index === 2 && currentStep >= 3 ? "#14155E" : "",
                      }}
                    >
                      {text}
                    </button>
                  </SheetTrigger>
                  {content}
                </Sheet>
              )
            )}
          </div>
        )}
        <button
          className="max-w-fit text-white flex items-center gap-3 px-6 py-[1.375rem] action-shadow rounded-[2.75rem] border border-4 border-[#FFD13A] bg-primary"
          onClick={() => setShowButtons((prev) => !prev)}
        >
          <span className="font-semibold">Action</span>
          <span
            className={`${
              !showButtons ? "rotate-180" : "rotate-0"
            } flex items-center`}
          >
            <img src={CircleArrowDown} />
          </span>
        </button>
      </div>
    </div>
  );
};
