import Cancel from "@/components/custom/Icons/Cancel";
import MobileNavBar from "@/components/custom/MobileNavBar";
import Sidebar from "@/components/custom/SideBar";
import { MobileProvider } from "@/context/MobileContext";
import { useStepper } from "@/context/StepperContext";
import { useMediaQuery } from 'react-responsive'
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { formVisible } = useStepper();
    console.log(formVisible)
    const navigate = useNavigate();


    return(
        <MobileProvider>
            <main className="min-h-screen w-full flex flex-col items-center">
                <div className="w-full relative">
                    {!formVisible && <Sidebar />}
                    <div className={`mx-auto my-0 ${formVisible ? `md:w-full` :`md:absolute md:right-0 md:w-10/12`}`}>
                        <div className="w-[90%] mx-auto">
                            <div className={`${formVisible ? `border-b border-b-[#0C0C0F29] justify-between` : `justify-end`} flex items-center max-h-[124px] md:h-[130px] my-3`}>
                                {formVisible && 
                                    <div className="flex items-center">
                                        <img src="icons/mark.svg" alt="Mark logo" />
                                        <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                                    </div>
                                }
                                <div className={`${formVisible && `justify-between`} flex items-center `}>
                                    <div className="flex items-center max-w-fit border-none hover:border hover:bg-accent hover:rounded-2xl py-2 px-2">
                                        <button className="bg-inherit focus:outline-none notransition border-none hover:z-1000 hover:bg-[#14155E14] hover:rounded-full p-2"><img src="icons/user.svg" alt="user logo" /></button>
                                        <img src="icons/arrow-down-01.svg" alt="arrow-down" />
                                    </div>
                                    <div>
                                        <button className="bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full p-2.5" onClick={() => {navigate(-1)}}><Cancel /></button>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="md:4/5 mx-auto max-w-4xl flex flex-col gap-10">
                                <Outlet />
                            </div>
                        </div>
                        {isMobile && 
                            <MobileNavBar />}
                    </div>
                </div>
            </main>
        </MobileProvider>  
    )
}