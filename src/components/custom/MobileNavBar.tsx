import { useSideBar } from "@/context/SideBarContext";
import { Link, useLocation } from "react-router-dom";
import ArrowRight from "./Icons/ArrowRight";
import useUserStore from "@/store/user-store";


export default function MobileNavBar() {
    const { pathname }= useLocation();
    const { links } = useSideBar();
    const { activeRole } = useUserStore();
    

    return (
        <>
        {links.map(({label, subLinks }) => activeRole === 'admin' && 
                activeRole === 'admin' &&
                (label === 'Requests' || label === 'Institution') ? (
                    <>
                        {/* <div className="hover:text-black flex space-x-4 px-2 items-center justify-between z-50">
                            <span>{icon}</span>
                            {path.includes(pathname) && <span>{label}</span>}
                        </div> */}
                        {subLinks && 
                            <NavComponent subLinks={subLinks} />
                        }  
                    </>
                )  
                : 
               (
                <div className="w-full fixed bottom-0 flex flex-col justify-center bg-white min-h-[76px] px-3 py-4 ">
                    <ul className="flex  items-center justify-between px-3 py-4">
                        {links.map(({  path, icon, label }) => 
                        (
                            <Link to={path} className={`${path.includes(pathname) ? 'text-black' : 'text-black/30'} hover:text-black flex space-x-4 px-2 items-center justify-between z-50`}>
                                <span>{icon}</span>
                                {path.includes(pathname) && <span>{label}</span>}
                            </Link>
                        ))}
                    </ul>
                </div>
               ) 
            )}
        
        </>
        
    )
}
// if role is admin and if path is /requests or /institution,
// show component for navigation


export const NavComponent = ({ subLinks }: { subLinks: any[]}) => {
    const { pathname } = useLocation();

    return (
        <div className="h-full w-full">
            <div className="px-6 py-1">
                <div className="w-full flex flex-col gap-4">
                    {subLinks.map(({ path, icon, label}) => (
                        <Link
                        key={label}
                        to={path}
                        className={`${
                          path.includes(pathname)
                            ? 'text-black'
                            : 'text-black/30'
                        } hover:text-black flex justify-start `}
                      >
                        <span className="py-3 px-4">
                            <span>{icon}</span>
                            <span>{label}</span>
                        </span>
                        <span className="text-center">
                            <ArrowRight />
                        </span>
                      </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}