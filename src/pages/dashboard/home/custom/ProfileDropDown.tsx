import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import Loader from "@/components/custom/Loader";
import ArrowDown from "/icons/arrow-down-01.svg";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";



type ProfileDropdownProps = {
    profile: {
        name: string;
        role: JSX.Element;
        email: string;
    };
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    handleClose: () => void;
};

export default function ProfileDropDown() {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data } = useOnboardingFormStore();

    const profile = {
        name: data.onboardingDetails.firstName + ' ' + data.onboardingDetails.lastName ||'',
        role: <span className="">Researcher</span>,
        email: data.onboardingDetails.email || '',
    };

    const handleClose = () => setOpen(false);

    if (loading) return <Loader />;

    return isDesktop ? (
        <DesktopProfileDropDown
            open={open}
            setOpen={setOpen}
            profile={profile}
            setLoading={setLoading}
            handleClose={handleClose}
        />
    ) : (
        <MobileProfileSheet
            open={open}
            setOpen={setOpen}
            profile={profile}
            setLoading={setLoading}
            handleClose={handleClose}
        />
    );
}

// Desktop dropdown for profile
function DesktopProfileDropDown({
    open,
    setOpen,
    profile,
    setLoading,
    handleClose,
}: ProfileDropdownProps) {
    return (
        <div className="relative">
            <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                <div className="flex items-center max-w-fit">
                    <DropdownMenuTrigger asChild>
                        <button className="border-none hover:border hover:bg-accent hover:rounded-2xl py-2 px-2 bg-inherit focus:outline-none notransition flex items-center">
                            <User className="bg-inherit border-none hover:bg-[#14155E14] hover:rounded-full p-2" />
                            <img src={ArrowDown} alt="arrow-down" className={`w-6 h-6 ${open ? "rotate-180" : "rotate-0"}`} />
                        </button>
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent className="py-8 px-4 flex flex-col gap-6 rounded-3xl w-full max-w-[24rem] mr-[6rem]">
                    <ProfileHeader profile={profile} />
                    <ProfileCard setLoading={setLoading} setOpen={handleClose} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

// Mobile sheet for profile
function MobileProfileSheet({
    open,
    setOpen,
    profile,
    setLoading,
    handleClose,
}: ProfileDropdownProps) {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <div className="flex items-center max-w-fit">
                <SheetTrigger asChild>
                    <button className="border-none hover:border hover:bg-accent hover:rounded-2xl py-2 px-2 bg-inherit focus:outline-none notransition flex items-center">
                        <User className="bg-inherit border-none hover:bg-[#14155E14] hover:rounded-full p-2" />
                        <img src={ArrowDown} alt="arrow-down" className={`w-6 h-6 ${open ? "rotate-180" : "rotate-0"}`} />
                    </button>
                </SheetTrigger>
            </div>
            <SheetContent side="right" className="w-full">
                <div className="w-[90%] mx-auto">
                    <SheetHeader>
                        <div className="flex justify-left w-full px-4">
                            <SheetClose>
                                <BackButton goBack={handleClose} className="!rounded-full !bg-[#14155E14] !mt-0 !p-2 !gap-0" />
                            </SheetClose>
                        </div>
                        <ProfileHeader profile={profile} />
                    </SheetHeader>
                    <div className="py-8 flex flex-col gap-6">
                        <ProfileCard setLoading={setLoading} setOpen={handleClose} />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

// Profile Header Component
function ProfileHeader({ profile }: { profile: { name: string; role: JSX.Element; email: string } }) {
    return (
        <div className="flex gap-4 items-center justify-left py-3 px-4">
            <div className="rounded-full bg-[#14155E14] p-2">
                <User />
            </div>
            <div className="flex flex-col gap-1 justify-left">
                <p className="text-sm inter text-[#0C0D0F]">{profile.name}</p>
                <p className="text-sm text-[#868687] inter">
                    <span>({profile.role})</span> <span className="font-[400]">{profile.email}</span>
                </p>
            </div>
        </div>
    );
}

// Profile options card
function ProfileCard({ setOpen, setLoading }: { setOpen: () => void; setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const profileOptions = [
        {
            label: "Settings",
            path: "/settings",
            icon: <SettingsIcon />,
        },
        {
            label: "Help",
            path: "/help",
            icon: <HelpCircle />,
        },
        {
            label: "Logout",
            path: <Logout setLoading={setLoading} />,
            icon: <LogOutIcon />,
        },
    ];

    return (
        <ul className="flex flex-col gap-1">
            {profileOptions.map(({ label, path, icon }, index) => (
                <li key={index} className="hover:text-black flex space-x-4 px-4 py-3 items-center justify-between z-50">
                    {typeof path === "string" ? (
                        <Link to={path} className="flex gap-2 text-[#868687] hover:text-black" onClick={setOpen}>
                            <span>{icon}</span>
                            <span>{label}</span>
                        </Link>
                    ) : (
                        <Sheet>
                            <SheetTrigger className="flex gap-2 text-[#868687] hover:text-black">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </SheetTrigger>
                            <Logout setLoading={setLoading} />
                        </Sheet>
                    )}
                </li>
            ))}
        </ul>
    );
}