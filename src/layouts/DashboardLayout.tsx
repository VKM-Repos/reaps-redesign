import MobileNavBar from '@/components/custom/MobileNavBar';
import Sidebar from '@/components/custom/SideBar';
import { MobileProvider } from '@/context/MobileContext';
import ProfileDropDown from '@/pages/dashboard/home/custom/ProfileDropDown';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router-dom';
import Marklogo from '/icons/mark.svg';

export default function DashboardLayout() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <MobileProvider>
      <main className="flex min-h-screen w-full max-w-full flex-col items-center">
        <div className="relative w-full">
          <Sidebar />
          <div className="mx-auto my-0 md:absolute md:right-0 md:w-10/12">
            <div className="mx-auto w-[90%]">
              <div className="mb-4 flex max-h-[124px] items-center justify-between py-4 md:h-[130px] md:justify-end">
                <img
                  className="block md:hidden"
                  src={Marklogo}
                  alt="Mark logo"
                />
                <ProfileDropDown />
              </div>
              <div className="md:4/5 mx-auto flex max-w-4xl flex-col gap-10">
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
