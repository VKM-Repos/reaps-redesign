import Sidebar from "@/components/custom/SideBar";
import { MobileProvider } from "@/context/MobileContext";
import { Outlet } from "react-router-dom";


//popover

//navbar width-80 sticky justify-en z-index

export default function DashboardLayout() {
    return(
        <MobileProvider>
            <main className="min-h-screen w-full flex flex-col items-center">
                <div className="w-full">
                    {/* <div className="max-h-[124px] md:h-[130px] flex items-center">
                        <div className="flex justify-between items-center w-full md:w-11/12 my-0">
                            <div className="flex items-center">
                                <img src="icons/mark.svg" alt="Mark logo" />
                                <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                            </div>
                            
                        </div>
                    </div> */}
                    <div className="relative">
                        <Sidebar />
                        <div className="mx-auto my-0 md:absolute md:right-0 md:w-10/12">
                            <div className="w-[90%] mx-auto">
                                <div className="flex items-center justify-end max-h-[124px] md:h-[130px] my-3">
                                    <img src="icons/user.svg" alt="user logo" />
                                    <button className="bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full px-1"><img src="icons/arrow-down-01.svg" alt="arrow-down" /></button>
                                </div>
                                <div className="md:4/5 mx-auto max-w-4xl flex flex-col gap-10">
                                    <Outlet />
                                </div>
                            </div>
                            {/* mobile navbar hidden in medium screen below children */}
                        </div>
                    </div>
                </div>
            </main>
        </MobileProvider>
        
    )
}