import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Cancel from "@/components/custom/Icons/Cancel";
import Stepper from "@/components/custom/Stepper";
import { useRequestsStore } from "@/context/RequestFormStore";
import { useMediaQuery } from "react-responsive";
import { array } from "@/lib/helpers";
import { useStepper } from "@/context/StepperContext";
import ProfileDropDown from "@/pages/dashboard/home/custom/ProfileDropDown";

type Props = {
    children: ReactNode;
}
export default function RequestsLayout({ children }: Props) {
    const navigate = useNavigate();
    const { step } = useRequestsStore();
    const { stepper } = useStepper();
    const isLarge = useMediaQuery({query: '(max-width: 1024px)'});

    return (
        <main className="overflow-y-scroll fixed top-0 left-0 bg-white h-full w-full z-40">
            <div className="w-full mx-auto my-0 relative py-[2rem] px-[1.25rem] max-h-[130px] lg:p-[3.625rem] lg:max-h-[130px] border-b border-[#0C0C0F29]">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center w-full sm:w-11/12 mx-auto my-0">
                        <div className="flex items-center justify-center">
                            <img src="icons/mark.svg" alt="Mark logo" />
                            <img className="lg:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                        </div>
                        <div className="flex justify-center items-center w-full">
                            {step >= 3 && (
                                isLarge ? (
                                    <p className="font-[600] text-sm">{array[stepper]}</p>
                                ) : (
                                    <Stepper />
                                )
                            )}
                        </div>
                        <div className="flex items-center justify-end w-full max-w-fit gap-1">
                            <ProfileDropDown />
                            <button className="h-fit bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full p-2.5" onClick={() => {navigate(-1)}}><Cancel /></button>
                        </div>
                    </div>
                    {step >= 3 &&
                        (isLarge && 
                            <Stepper />
                        ) 
                    }
                </div>
                
            </div>
            <div className="py-[2.625rem]">
                {children}
            </div>
        </main>
    )
}