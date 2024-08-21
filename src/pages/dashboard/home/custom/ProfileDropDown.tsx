import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import User from "@/components/custom/Icons/User";
import SettingsIcon from "@/components/custom/Icons/SettingsIcon";
import HelpCircle from "@/components/custom/Icons/HelpCircle";
import LogOutIcon from "@/components/custom/Icons/LogOutIcon";
import Logout from "@/components/custom/LogOut";
import { Link } from "react-router-dom";

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

    if (isDesktop) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <button className="bg-inherit focus:outline-none notransition border-none hover:z-1000 hover:bg-[#14155E14] hover:rounded-full p-2"><User /></button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex gap-4 items-center justify-center py-3 px-4">
                            <div className="hover:rounded-full hover:bg-[#14155E14] p-2"><User /></div>
                                <div className="flex flex-col gap-1 items-center justify-left">
                                    <p className="text-sm inter text-[#0C0D0F]">{profile.name}</p>
                                    <p className="text-sm text-[#868687] inter"><span>({profile.role})</span> <span className="font-[400]">{profile.email}</span></p>
                                </div>
                                <div>
                                    <ul className="flex flex-col gap-1">
                                        {profileOptions.map(({ label, path, icon }) => (
                                            <Link>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>

                        </div>
                       
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Sheet>
            <SheetTrigger>
                <button className="bg-inherit focus:outline-none notransition border-none hover:z-1000 hover:bg-[#14155E14] hover:rounded-full p-2"><User /></button>
            </SheetTrigger>
        </Sheet>
    )
}
function ProfileCard() {
    return (
        <div></div>
    )
}