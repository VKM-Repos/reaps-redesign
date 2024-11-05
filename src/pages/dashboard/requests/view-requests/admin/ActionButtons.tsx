import ArrowRight from "@/components/custom/Icons/ArrowRight";
import AssignReviewer from "../../components/AssignReviewer";
import WriteReview from "../../components/WriteReview";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export const ActionButton = ({ setLoader }: { setLoader: (loading: boolean) => void}) => {
    const [showButtons, setShowButtons] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
  
  
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
        content: <AssignReviewer setLoader={setLoader}/>
      }, 
      {
        id: "2",
        text: "Review",
        color: "#BD6BC9",
        content: <WriteReview setLoader={setLoader}/>
      }, 
      {
        id: "3",
        text: "Final Review",
        color: "#566DBE" 
      }
    ]
  
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
                      color: index === 2 && currentStep >= 3 ? 'white' : color,
                      backgroundColor: index === 2 && currentStep >= 3 ? '#14155E' : ''
                    }}>
                      {text}
                    </button>
                  </DialogTrigger>                
                    {content}
                </Dialog>
               
              ))}
            </div>}
            <button className="max-w-fit text-white flex items-center gap-3 px-6 py-[1.375rem] action-shadow rounded-[2.75rem] border border-4 border-[#FFD13A] bg-primary" onClick={() => setShowButtons((prev) => !prev)}>
              <span className="font-semibold">Action</span>
              <span className="rounded-[36px] border border-white w-6 h-6 ">
                <span className={`${!showButtons ? 'rotate-90' : 'rotate-270'} flex items-center`}>
                  <ArrowRight />
                </span>
              </span>
            </button>
          </div>
         </div>
     )
  }
  
