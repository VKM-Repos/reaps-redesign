import { useSideBar } from "@/context/SideBarContext";
import { Link, useLocation } from "react-router-dom";


export default function MobileNavBar() {
    const { pathname }= useLocation();
    const { links } = useSideBar();
    

    return (
        <div className="w-full fixed bottom-0 px-6 gap-8">
            <ul className="flex">
                {links.map(({  path, icon, label }) => (
                    <Link to={path} className={`hover:text-black flex space-x-4 items-center justify-end z-50`}>
                        <span>{icon}</span>
                        ${path.includes(pathname) && <span>{label}</span>}
                    </Link>
                ))}
            </ul>
        </div>
    )
}