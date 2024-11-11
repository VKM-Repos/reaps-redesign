import { useSideBar } from "@/context/SideBarContext";
import { Link, useLocation } from "react-router-dom";


export default function MobileNavBar() {
    const { pathname }= useLocation();
    const { links } = useSideBar();
    

    return (
        <div className="w-full fixed bottom-0 flex flex-col justify-center bg-white min-h-[76px] px-3 py-4 ">
            <ul className="flex  items-center justify-between px-3 py-4">
                {links.map(({ path, icon, label }, index) => (
                    <Link key={index} to={path} className={`${path.includes(pathname) ? 'text-black' : 'text-black/30'} hover:text-black flex space-x-4 px-2 items-center justify-between z-50`}>
                        <span>{icon}</span>
                        {path.includes(pathname) && <span>{label}</span>}
                    </Link>
                ))}
            </ul>
        </div>
    )
}