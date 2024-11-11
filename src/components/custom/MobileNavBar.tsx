import { useSideBar } from "@/context/SideBarContext";
import { Link, useLocation } from "react-router-dom";
import ArrowRight from "./Icons/ArrowRight";
import useUserStore from "@/store/user-store";
import { useEffect, useState } from "react";


export default function MobileNavbar() {
    const { pathname } = useLocation();
    const { links } = useSideBar();
    const { activeRole } = useUserStore();
    const [activeLabel, setActiveLabel ] = useState<string | null>();

    const handleLinkClick = (label: string) => {
        setActiveLabel(label);
    };

    // handle cases for when url is navigated in ways other than clicking the link
    useEffect(() => {
        if (activeRole === 'admin') {
            if (pathname === '/requests') {
                setActiveLabel('Requests')
            } else if (pathname === '/institution') {
                setActiveLabel('Institution')
            }
        }
    }, [activeRole, pathname])

    return (
        <>
            {activeRole === 'admin' && activeLabel && (pathname === '/requests' || pathname === '/institution') &&
                links.map(({ label, subLinks, path }) => 
                    activeLabel === label && (pathname === path || pathname === path) && subLinks ? (
                        <div key={label} className="mt-14">
                            <NavComponent subLinks={subLinks} />
                        </div>
                    ) : null
                )
            }
            <div className="w-full fixed bottom-0 flex flex-col justify-center bg-white min-h-[76px] px-3 py-4">
                <ul className="flex items-center justify-between px-3 py-4">
                    {links.map(({ path, icon, label }, index) => (
                        <Link
                            key={index}
                            to={path}
                            onClick={() => handleLinkClick(label)}
                            className={`${
                                path.includes(pathname) ? 'text-black' : 'text-black/30'
                            } hover:text-black flex space-x-4 px-2 items-center justify-between`}
                        >
                            <span>{icon}</span>
                            {path.includes(pathname) && <span>{label}</span>}
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    );
};

const NavComponent = ({ subLinks }: { subLinks: any[] }) => {
    const { pathname } = useLocation();

    return (
        <div className="h-full w-full">
            <div className="px-6 py-1 w-full">
                <div className="w-full flex flex-col gap-4">
                    {subLinks.map(({ path, icon, label }) => (
                        <Link
                            key={label}
                            to={path}
                            className={`${
                                path === pathname ? 'text-black' : 'text-black/30'
                            } hover:text-black flex justify-between items-center w-full `}
                        >
                            <span className="py-3 px-4 flex gap-4">
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
    );
};
