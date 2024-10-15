import { Link, useLocation} from 'react-router-dom' 
import { useSideBar } from '@/context/SideBarContext';
import Reapslogo from "/icons/reap-icon.svg"
import Marklogo from "/icons/mark.svg"
import { useRole } from '@/hooks/useRole';


export default function Sidebar() {
    const { pathname } = useLocation();
    const { links } = useSideBar();
    const { role } = useRole();

    return (
        <div className="max-w-[240px] hidden md:block w-full flex flex-col fixed z-[1000] h-full">
            <div className="max-h-[124px] md:h-[130px] flex items-center my-3">
                <div className="flex items-center justify-center w-full md:w-11/12">
                    <div className="flex items-center justify-center">
                        <img src={Marklogo} alt="Mark logo" />
                        <img className="md:block hidden" src={Reapslogo} alt="Reap logo for website" />
                    </div>
                </div>
            </div>
            <div className="overflow-y-scroll h-[calc(100vh-130px)] scrollbar-hide"> 
                <ul className="px-6 gap-8 flex flex-col pb-10">
                    {links.map(({ path, icon, label, subLinks }) => (
                        role === 'INSTITUTION_ADMIN' && (label === 'Requests' || label === 'Institution') ? (
                            <div key={label} className="flex flex-col gap-4">
                                <div className="uppercase text-xs text-black/30">
                                    {label}
                                </div>
                                <div className='gap-8 flex flex-col'>
                                    {subLinks && subLinks.map(({ path, icon, label }) => (
                                        <Link
                                            key={label}
                                            to={path}
                                            className={`${
                                                path.includes(pathname) ? 'text-black' : 'text-black/30'
                                            } hover:text-black flex space-x-4 items-center justify-start`}
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
                                    path.includes(pathname) ? 'text-black' : 'text-black/30'
                                } hover:text-black flex space-x-4 items-center justify-start`}
                            >
                                <span>{icon}</span>
                                <span>{label}</span>
                            </Link>
                        )
                    ))}
                </ul>
            </div>
        </div>
    )
} 
