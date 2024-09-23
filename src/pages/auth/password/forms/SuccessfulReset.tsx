import { Button } from "@/components/ui/button"
import {  useNavigate } from "react-router-dom";
import { usePasswordStore } from "@/store/recoverPasswordStore";
import { useState } from "react";
import Loader from "@/components/custom/Loader";



export default function SuccessfulReset() {
    const { resetStore } = usePasswordStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    function goToLogin() {  
        setLoading(true);
        setTimeout(() => {
            resetStore();
            navigate("/login");
            setLoading(false);
        }, 3000);
        
    }

    return (

        <main className="min-h-screen w-full mx-auto my-0 flex flex-col items-center">
            <div className="w-full py-[2rem] px-[1.25rem] max-h-[124px] md:p-[3.625rem] md:max-h-[130px]">
                <div className="w-4/5 sm:w-4/5 mx-auto my-0 h-[124px]">
                    <div className="w-full flex">
                        <img src="icons/mark.svg" alt="Mark logo" />
                        <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                    </div>
                </div>
            </div>
            {loading && <Loader />}
                <div className="w-full max-w-[700px] mx-auto my-0 antialiased relative md:pt-10 flex flex-col md:gap-y-10 px-2">
                    <div className="flex flex-col text-center justify-center items-center gap-5 md:gap-y-[2.5rem]">
                        <img src="icons/checkmark-frame.svg" alt="Successful mark" />
                        <h1 className=" font-[800] barlow uppercase tracking-[0.03rem] md:text-[64px] text-[2.5rem]">You have successfully reset your password</h1>
                        <p className="pb-[1.5rem] text-[#454745]">Still need help? <span className="font-semibold">Contact us</span></p>
                    </div>
                    <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                        <Button className={`my-4 focus:outline-none w-full`} onClick={() => { goToLogin()}}>Back to Login</Button>
                    </div>
                </div>
        </main>
    )

}
