/* eslint-disable @typescript-eslint/no-explicit-any */
import CircleArrowDown from "@/assets/circle-arrow-down-01.svg";
import AssignReviewer from "../../components/AssignReviewer";
import WriteReview from "../../components/WriteReview";
import { useRef, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import Smile from "@/assets/smile.svg";
import Unhappy from "@/assets/unhappy.svg";
import Unamused from "@/assets/unamused.svg";
import { Sheet, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

// Type Definitions
interface Action {
  id: string;
  text: string;
  color: string;
  content: JSX.Element;
}

interface FinalReviewRemark {
  id: string;
  text: string;
  color: string;
  icon: string;
}

interface ActionButtonProps {
  request: any;
}

const finalReviewRemarks: FinalReviewRemark[] = [
  { id: "1", text: "Approved", color: "#34A853", icon: Smile },
  { id: "2", text: "Declined", color: "#D03238", icon: Unhappy },
  { id: "3", text: "Re Opened", color: "#608FEB", icon: Unamused },
];

const buttonAnimations = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const ActionButton: React.FC<ActionButtonProps> = ({ request }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const closeSheetRef = useRef<HTMLButtonElement | null>(null);

  const handleStepForward = (index: number) => {
    if (index === currentStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const closeSheet = () => {
    closeSheetRef?.current?.click();
  };

  const actions: Action[] = [
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
          closeDialog={closeSheet}
          request_id={request?.id}
          data={request}
          remarks={finalReviewRemarks}
          buttonText="Submit final review"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full items-end">
      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="flex flex-col gap-3 items-end w-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {actions.map(({ text, color, content }, index) => (
              <motion.div key={index} variants={buttonAnimations}>
                {isMobile ? (
                  <Dialog>
                    <DialogTrigger>
                      <button
                        type="button"
                        className="bg-white action-shadow rounded-[2.75rem] px-6 py-[1.375rem] font-semibold max-w-fit"
                        onClick={() => handleStepForward(index)}
                        style={{
                          color,
                          backgroundColor:
                            currentStep >= 3 && index === 2 ? "#14155E" : "",
                        }}
                      >
                        {text}
                      </button>
                    </DialogTrigger>
                    {content}
                  </Dialog>
                ) : (
                  <Sheet>
                    <SheetTrigger>
                      <button
                        type="button"
                        className="bg-white action-shadow rounded-[2.75rem] px-6 py-[1.375rem] font-semibold max-w-fit"
                        onClick={() => handleStepForward(index)}
                        style={{
                          color,
                          backgroundColor:
                            currentStep >= 3 && index === 2 ? "#14155E" : "",
                        }}
                      >
                        {text}
                      </button>
                    </SheetTrigger>
                    {content}
                    <SheetClose>
                      <button
                        type="button"
                        className="hidden"
                        ref={closeSheetRef}
                      >
                        Close sheet
                      </button>
                    </SheetClose>
                  </Sheet>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        className="max-w-fit text-white flex items-center gap-3 px-6 py-[1.375rem] action-shadow rounded-[2.75rem] border border-4 border-[#FFD13A] bg-primary"
        onClick={() => setShowButtons((prev) => !prev)}
      >
        <span className="font-semibold">Action</span>
        <span
          className={`${
            !showButtons ? "rotate-180" : "rotate-0"
          } flex transition-all duration-150 delay-75 items-center`}
        >
          <img src={CircleArrowDown} alt="Arrow down" />
        </span>
      </button>
    </div>
  );
};
