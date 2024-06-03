import { Link, useLocation} from 'react-router-dom' 
import { useState } from 'react'
import { useSideBar } from '@/context/SideBarContext';


const Sidebar = () => {
    // const [ active, isActive ] = useState(false);
    const { pathname } = useLocation();
    const { links } = useSideBar();
    


    return (
        // w-2/12
        <div className="max-w-[240px] w-full flex flex-col fixed">
            {/* logo link */}
            <ul className='px-6 gap-4 flex flex-col min-h-[268px]'>
                {links.map(({  path, icon, label }) => (
                    // <li className="flex items-center pb-4 text-[#868687]" key={path}>
                    //     <Link onClick={() => { isActive(pathname === path)}} className={` my-0 py-3 px-4  ${active} ? 'text-black' : 'text-black/20'`} to={path}><span>{icon}</span>{label}</Link>
                    // </li>
                    <Link to={path} className={`${path.includes(pathname) ? 'text-black' : 'text-black/30'} flex space-x-4 items-center justify-start`}>
                    <span>{icon}</span>
                    <span>{label}</span>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;
