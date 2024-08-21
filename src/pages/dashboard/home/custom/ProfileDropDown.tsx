import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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


const renderLogOut = () => {
    return (
        <Logout />
    )
}
   


export default function ProfileDropDown() {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const [open, setOpen] = useState(false);
    const handleFunc = () => {
        setOpen(false);
    }

    if (isDesktop) {
        return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button className="bg-inherit focus:outline-none notransition border-none hover:z-1000 hover:bg-[#14155E14] hover:rounded-full p-2"><User /></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className="flex justify-left"> 
                            <BackButton title="" goBack={handleFunc} />
                        </div>
                        <div className="flex gap-4 items-center justify-center py-3 px-4">
                            <div className="hover:rounded-full hover:bg-[#14155E14] p-2"><User /></div>
                            <div className="flex flex-col gap-1 items-center justify-left">
                                <p className="text-sm inter text-[#0C0D0F]">{profile.name}</p>
                                <p className="text-sm text-[#868687] inter"><span>({profile.role})</span> <span className="font-[400]">{profile.email}</span></p>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ProfileCard />
                    
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <button className="bg-inherit focus:outline-none notransition border-none hover:z-1000 hover:bg-[#14155E14] hover:rounded-full p-2"><User /></button>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="flex justify-left"> 
                    <SheetClose><BackButton title="" goBack={handleFunc} /></SheetClose>
                </div>
                <SheetHeader>
                    <div className="flex gap-4 items-center justify-center py-3 px-4">
                        <div className="hover:rounded-full hover:bg-[#14155E14] p-2"><User /></div>
                        <div className="flex flex-col gap-1 items-center justify-left">
                            <p className="text-sm inter text-[#0C0D0F]">{profile.name}</p>
                            <p className="text-sm text-[#868687] inter"><span>({profile.role})</span> <span className="font-[400]">{profile.email}</span></p>
                        </div>
                    </div>
                </SheetHeader>
                <ProfileCard />
            </SheetContent>
        </Sheet>
    )
}
function ProfileCard() {
    return (
        <div>
            <ul className="flex flex-col gap-1">
                {profileOptions.map(({ label, path, icon }) => (
                    <li className="hover:text-black flex space-x-4 px-2 items-center justify-between z-50">
                        {typeof path === "string" ? 
                            <Link to={path} className="flex gap-2 text-[#454745] hover:text-black">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </Link>
                            :
                            <SheetTrigger onClick={() => {renderLogOut}} className="flex gap-2 text-[#454745] hover:text-black">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </SheetTrigger>
                          
                        }
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}