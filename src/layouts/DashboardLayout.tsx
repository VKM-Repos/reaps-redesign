import MobileNavBar from "@/components/custom/MobileNavBar";
import Sidebar from "@/components/custom/SideBar";
import { MobileProvider } from "@/context/MobileContext";
import { useMediaQuery } from 'react-responsive'
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return(
        <MobileProvider>
            <main className="min-h-screen w-full flex flex-col items-center">
                <div className="w-full relative">
                    <Sidebar />
                    <div className="mx-auto my-0 md:absolute md:right-0 md:w-10/12">
                        <div className="w-[90%] mx-auto">
                            <div className="flex items-center justify-end max-h-[124px] md:h-[130px] my-3">
                                <div className="flex items-center max-w-fit border-none hover:border hover:bg-accent hover:rounded-2xl py-2 px-2">
                                    <button className="bg-inherit focus:outline-none notransition border-none hover:z-1000 hover:bg-[#14155E14] hover:rounded-full p-2"><img src="icons/user.svg" alt="user logo" /></button>
                                    <img src="icons/arrow-down-01.svg" alt="arrow-down" />
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