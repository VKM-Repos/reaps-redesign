import { useMobileContext } from "@/context/MobileContext"
import BackButton from "./BackButton";
import { useOnboardingFormStore } from "@/context/CreateOnboardingFormStore";
import { useNavigate } from "react-router-dom";

export default function TopBar({title}: {title: string}) {
    const { isMobile, isSignUp, isDashboard } = useMobileContext(); 
    const { step, setStep } = useOnboardingFormStore();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (step > 1) {
          setStep(step - 1);
        }
      };
  

    return(
        <div className="py-[2rem] px-[1.25rem] max-h-[124px] md:p-[3.625rem] md:max-h-[130px] border-b border-[#0C0C0F29]">
            <div className="flex justify-between items-center w-full sm:w-4/5 mx-auto my-0">
                {isMobile && isSignUp ? 
                <div className="flex flex-col items-center justify-center">
                    <BackButton title={title} goBack={handleGoBack} />
                </div>
                : 
                <div className="flex items-center">
                    <img src="icons/mark.svg" alt="Mark logo" />
                    <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                </div>}
                {/* stepper nav  */}
                {/* {isDashboard ? 
                <div className="flex items-center justify-center">
                    <img src="icons/user.svg" alt="user logo" />
                    <button className="bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full px-1"><img src="icons/arrow-down-01.svg" alt="arrow-down" /></button>
                </div>:  */}
                <div>
                    <button className="bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full p-2.5" onClick={() => {navigate(-1)}}><img src="icons/cancel-01.svg" alt="Close/Open button" /></button>
                </div>
            </div>
       </div>
    )
}