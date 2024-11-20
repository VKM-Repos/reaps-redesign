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
        <ul className="flex flex-col gap-8 px-6 pb-10">
          {links.map(({ path, icon, label, subLinks }) =>
            activeRole === "admin" ||
            (activeRole === "super admin" &&
              (label === "Requests" ||
                label === "Institution" ||
                label === "Super Admin")) ? (
              <div key={label} className="flex flex-col gap-4">
                <div className="text-black/30 text-xs uppercase">{label}</div>
                <div className="flex flex-col gap-8">
                  {subLinks &&
                    subLinks.map(({ path, icon, label }) => (
                      <Link
                        key={label}
                        to={path}
                        className={`${
                          path.includes(pathname)
                            ? "text-black"
                            : "text-black/30"
                        } hover:text-black flex items-center justify-start space-x-4`}
                      >
                        <span>{icon}</span>
                        <span>{label}</span>
                      </Link>
                    ))}
                </div>
              </div>
            ) : (
              <Link
                key={label}
                to={path}
                className={`${
                  path.includes(pathname) ? "text-black" : "text-black/30"
                } hover:text-black flex items-center justify-start space-x-4`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
