import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import User from "@/components/custom/Icons/User";
import SettingsIcon from "@/components/custom/Icons/SettingsIcon";
import HelpCircle from "@/components/custom/Icons/HelpCircle";
import LogOutIcon from "@/components/custom/Icons/LogOutIcon";
import Logout from "@/components/custom/LogOut";
import { Link } from "react-router-dom";
import BackButton from "@/components/custom/BackButton";
import { useLogout } from "@/context/LogoutContext";
import Loader from "@/components/custom/Loader";
import ArrowDown from "/icons/arrow-down-01.svg"

const profile = {
    name: "John Doe",
    role: "Researcher",
    email: "johndoe@gmail.com"
}

const profileOptions = [
    {
        label: "Settings",
        path: "/settings",
        icon: <SettingsIcon />
    },
    {
        label: "Help",
        path: "/help",
        icon: <HelpCircle />
    },
    {
        label: "Logout",
        path: <Logout />,
        icon: <LogOutIcon />
    }
]



   


export default function ProfileDropDown() {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const [open, setOpen] = useState(false);
    const { loading } = useLogout();

    const handleFunc = () => {
        setOpen(false);
    }

    if (isDesktop) {
        return (
            <div className="relative">
                {loading && <Loader />}
                <DropdownMenu open={open} onOpenChange={setOpen}>
                <div className="flex items-center max-w-fit">
                        
                            <DropdownMenuTrigger asChild>
                            <button
                           
                            className="border-none hover:border hover:bg-accent hover:rounded-2xl py-2 px-2 bg-inherit focus:outline-none notransition flex items-center"
                        >
                                <div className="flex items-center justify-center">
                                    <User className="bg-inherit focus:outline-none notransition border-none hover:bg-[#14155E14] hover:rounded-full p-2" />
                                    <img src={ArrowDown} alt="arrow-down" className={open ? 'rotate-180' : 'rotate-0'}/>
                                </div>
                                </button>
                            </DropdownMenuTrigger>   
                        
                    </div>
                <DropdownMenuContent className="py-8 px-4 flex flex-col gap-6 rounded-3xl w-full max-w-[24rem] mr-[6rem]">
                    <DropdownMenuLabel className="flex gap-4 items-center justify-left py-3 px-4">
                        <div className="rounded-full bg-[#14155E14] p-2"><User /></div>
                        <div className="flex flex-col gap-1 justify-left">
                            <p className="text-sm inter text-[#0C0D0F]">{profile.name}</p>
                            <p className="text-sm text-[#868687] inter"><span>({profile.role})</span> <span className="font-[400]">{profile.email}</span></p>
                        </div>
                      
                    </DropdownMenuLabel>
                    <ProfileCard />
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
            
        )
    }
    return (
        <>
            {loading && <Loader />}
            <Sheet open={open} onOpenChange={setOpen}>
                <div className="flex items-center max-w-fit">
                        <button
                            className="border-none hover:border hover:bg-accent hover:rounded-2xl py-2 px-2 bg-inherit focus:outline-none notransition flex items-center"
                        >
                            <SheetTrigger asChild>
                                <div className="flex items-center justify-center">
                                    <User className="bg-inherit focus:outline-none notransition border-none hover:bg-[#14155E14] hover:rounded-full p-2" />
                                    <img src="icons/arrow-down-01.svg" alt="arrow-down"/>
                                </div>
                            </SheetTrigger>
                            
                        </button>
                    </div>
                <SheetContent side="right" className="w-full">
                    <div className="w-[90%] mx-auto">
                        <div className="flex justify-left w-full px-4"> 
                            <SheetClose><BackButton goBack={handleFunc} className="!rounded-full !bg-[#14155E14] !mt-0 !p-2 !gap-0"/></SheetClose>
                        </div>
                        <div className="py-8 flex flex-col gap-6">
                            <SheetHeader>
                                <div className="flex gap-2 py-3 px-5">
                                    <div className="rounded-full bg-[#14155E14] p-2"><User /></div>
                                    <div className="flex flex-col gap-1 text-left justify-left">
                                        <p className="text-sm inter text-[#0C0D0F]">{profile.name}</p>
                                        <p className="text-sm text-[#868687] inter"><span className="font-bold">({profile.role})</span> <span className="font-[400]">{profile.email}</span></p>
                                    </div>
                                </div>
                            </SheetHeader>
                            <ProfileCard />
                        </div>
                    </div>
                    
                </SheetContent>
            </Sheet>
        </>
        
    )
}

function ProfileCard() {
    return (
        <div>
            <ul className="flex flex-col gap-1">
                {profileOptions.map(({ label, path, icon }) => (
                    <li className="hover:text-black flex space-x-4 px-4 py-3 items-center justify-between z-50">
                        {typeof path === "string" ? 
                            <Link to={path} className="flex gap-2 text-[#868687] hover:text-black">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </Link>
                            :
                            <Sheet>
                                <SheetTrigger className="flex gap-2 text-[#868687] hover:text-black">
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </SheetTrigger>
                                <Logout />
                            </Sheet>
                        }
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}