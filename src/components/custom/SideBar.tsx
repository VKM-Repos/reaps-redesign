import { Link, useLocation } from "react-router-dom";
import { useSideBar } from "@/context/SideBarContext";
import Reapslogo from "/icons/reap-icon.svg";
import Marklogo from "/icons/mark.svg";
import useUserStore from "@/store/user-store";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { links } = useSideBar();
  const { activeRole } = useUserStore();

  return (
    <div className="fixed hidden h-full w-full max-w-[240px] flex-col md:block">
      <div className="my-3 flex max-h-[124px] items-center md:h-[130px]">
        <div className="flex w-full items-center justify-center md:w-11/12">
          <div className="flex items-center justify-center">
            <img src={Marklogo} alt="Mark logo" />
            <img
              className="hidden md:block"
              src={Reapslogo}
              alt="Reap logo for website"
            />
          </div>
        </div>
      </div>
      <div className="scrollbar-hide h-[calc(100vh-130px)] overflow-y-scroll">
        <ul className="flex flex-col gap-6 px-6 pb-10">
          {links.map(({ path, icon, label, subLinks }) => {
            if (
              activeRole === "admin" &&
              (label === "Requests" || label === "Institution")
            ) {
              return (
                <div key={label} className="flex flex-col gap-4">
                  <div className="text-[#9B9E9B]/60 text-xs uppercase font-bold">
                    {label}
                  </div>
                  <div className="flex flex-col gap-6">
                    {subLinks &&
                      subLinks.map(({ path, icon, label }) => (
                        <Link
                          key={label}
                          to={path}
                          className={`${
                            path.endsWith(pathname)
                              ? "text-[#515152] font-semibold"
                              : "text-[#868687]"
                          } hover:text-[#515152] text-sm font-normal flex items-center justify-start space-x-4`}
                        >
                          <span>{icon}</span>
                          <span>{label}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={label}
                to={path}
                className={`${
                  path.includes(pathname)
                    ? "text-[#515152] font-semibold"
                    : "text-[#868687]"
                } hover:text-[#515152] font-normal text-sm flex items-center justify-start space-x-4`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
