import { Button } from "@/components/ui/button"
import {  useNavigate } from "react-router-dom";
import { usePasswordStore } from "@/store/recoverPasswordStore";



export default function SuccessfulReset() {
    const { resetStore } = usePasswordStore();
    const navigate = useNavigate();

    function goToLogin() {  
        resetStore();
        navigate("/login");
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

                <div className="w-full max-w-[700px] mx-auto my-0 antialiased inter relative md:pt-10 flex flex-col md:gap-y-10 px-2">
                    <div className="flex flex-col text-center justify-center items-center md:gap-y-10">
                        <img src="icons/checkmark-frame.svg" alt="Successful mark" />
                        <h1 className="md:text-xl7 text-[1rem] font-bold barlow uppercase pt-5 md:py-5 tracking-[0.03rem]">You have successfully reset your password</h1>
                        <p className="pb-5 pt-10 text-[#454745]">Still need help? <span className="font-semibold">Contact us</span></p>
                    </div>
                    <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0 py-[1rem]">
                        <Button className={`my-4 focus:outline-none w-full`} onClick={() => { goToLogin()}}>Back to Login</Button>
                    </div>
                </div>
        </main>
    )

}
