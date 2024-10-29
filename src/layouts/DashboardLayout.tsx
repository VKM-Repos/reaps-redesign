import MobileNavBar from "@/components/custom/MobileNavBar";
import Sidebar from "@/components/custom/SideBar";
import { MobileProvider } from "@/context/MobileContext";
import ProfileDropDown from "@/pages/dashboard/home/custom/ProfileDropDown";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import Marklogo from "/icons/mark.svg";

export default function DashboardLayout() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <MobileProvider>
      <main className="min-h-screen w-full max-w-full flex flex-col items-center">
        <div className="w-full relative">
          <Sidebar />
          <div className="mx-auto my-0 md:absolute md:right-0 md:w-10/12">
            <div className="w-[90%] mx-auto">
              <div className="flex md:justify-end justify-between items-center max-h-[124px] md:h-[130px] py-4 mb-4">
                <img
                  className="md:hidden block"
                  src={Marklogo}
                  alt="Mark logo"
                />
                <ProfileDropDown />
              </div>
              <div className="md:4/5 mx-auto max-w-4xl flex flex-col gap-10">
                <Outlet />
              </div>
            </div>
            {isMobile && <MobileNavBar />}
          </div>
        </div>
      </main>
    </MobileProvider>
  );
}
