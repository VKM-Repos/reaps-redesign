import { useMobileContext } from "@/context/MobileContext"
import BackButton from "./BackButton";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { useNavigate } from "react-router-dom";
import Cancel from "./Icons/Cancel";
import { useMediaQuery } from "react-responsive";
import { signupArray } from "@/lib/helpers";
import Stepper from "./Stepper";


export default function TopBar({title}: {title: string}) {
    const { isMobile } = useMobileContext(); 
    const { step, setStep } = useOnboardingFormStore();
    const isLarge =  useMediaQuery({query: '(max-width: 1024px)'});
    const navigate = useNavigate();
    const isSignUp = location.pathname.includes("/signup");

    const handleGoBack = () => {
        if (step > 1) {
          setStep(step - 1);
        }
      };

  

    return(
        <div className="py-[2rem] px-[1.25rem] max-h-[124px] md:p-[3.625rem] md:max-h-[130px] border-b border-[#0C0C0F29]">
            <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center w-full mx-auto my-0">
            
                {isMobile && isSignUp ? 
                <div className="flex flex-col items-start justify-center w-full">
                    <BackButton title={title} goBack={handleGoBack} className="!mt-0"/>
                </div>
                : 
                <div className="flex items-center">
                    <img src="icons/mark.svg" alt="Mark logo" />
                    <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                </div>}
                {isSignUp &&
                <div className="flex justify-center items-center md:mr-14 w-full">
                    {isLarge ? '' : (
                            <Stepper setStep={setStep} step={step} array={signupArray}/>
                        )
                    }
                </div>
                }
                <div>
                    <button className="bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full p-2.5" onClick={() => {navigate(-1)}}><Cancel /></button>
                </div>
                
            </div>
            {isSignUp &&
                (isLarge && 
                    <Stepper array={signupArray} setStep={setStep} step={step} />
                ) 
            }
            </div>
       </div>
    )
}