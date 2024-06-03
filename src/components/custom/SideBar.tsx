import { Link, useLocation} from 'react-router-dom' 
import { useState } from 'react'
import { useSideBar } from '@/context/SideBarContext';


const Sidebar = () => {
    // const [ active, isActive ] = useState(false);
    const { pathname } = useLocation();
    const { links } = useSideBar();
    


    return (
        <div className="max-w-[240px] hidden md:block w-full flex flex-col fixed">
            <div className="max-h-[124px] md:h-[130px] flex items-center my-3">
                <div className="flex items-center justify-center w-full md:w-11/12">
                    <div className="flex items-center justify-center">
                        <img src="icons/mark.svg" alt="Mark logo" />
                        <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
                    </div> 
                </div>
            </div>
            <ul className='px-6 gap-8 flex flex-col min-h-[268px]'>
                {links.map(({  path, icon, label }) => (
                    <Link to={path} className={`${path.includes(pathname) ? 'text-black' : 'text-black/30'} hover:text-black flex space-x-4 items-center justify-start`}>
                    <span>{icon}</span>
                    <span>{label}</span>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;
