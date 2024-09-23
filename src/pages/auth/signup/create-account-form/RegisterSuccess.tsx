import { Button } from "@/components/ui/button"
import {  useNavigate } from "react-router-dom";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import Loader from "@/components/custom/Loader";
import { Props } from "@/types/forms.types";



export default function RegisterSuccess({ handleNext }: Props) {
    const { resetStore, loading, setLoading } = useOnboardingFormStore();
    const navigate = useNavigate();

    function goToLogin() { 
        setLoading(true);
        setTimeout(() => {
            handleNext();
            resetStore();
            navigate("/login");
            setLoading(false);
        }, 3000) 
       
    }

    return (
        <>
        {loading && <Loader />}
        <main className="min-h-screen w-full mx-auto my-0 flex flex-col items-center">
            <div className="w-full py-[2rem] px-[1.25rem] max-h-[124px] md:p-[3.625rem] md:max-h-[130px]">
                <div className="md:w-4/5 w-full mx-auto my-0 h-[124px]">
                    <div className="w-full flex">
                        <img src="icons/mark.svg" alt="Mark logo" />
                        <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[700px] mx-auto my-0 antialiased relative md:pt-10 flex flex-col md:gap-y-10 px-2">
                    <div className="flex flex-col text-center justify-center items-center gap-5 md:gap-y-[2.5rem]">
                        <img src="icons/checkmark-frame.svg" alt="Successful mark" />
                        <h1 className="font-[800] font-barlow uppercase tracking-[-0.05rem] md:text-[64px] text-[2.5rem]">You have successfully registered your reaps account</h1>
                        <p className="text-sm text-[#454745]">Please click on the <span className="font-semibold">continue</span> button to proceed to your dashboard</p>
                    </div>
                    <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                        <Button className={`my-4 focus:outline-none w-full`} onClick={() => { goToLogin()}}>Continue</Button>
                    </div>
                </div>
        </main>
        </>
        
    )

}
