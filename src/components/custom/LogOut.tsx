import { useState } from "react"
import Loader from "./Loader";
import { SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";
import { useOnboardingFormStore } from "@/context/CreateOnboardingFormStore";
import { useNavigate } from "react-router-dom";
import LogOutLarge from "./Icons/LogOutLarge";

export default function Logout() {
    const [loading, setLoading ] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { resetStore } = useOnboardingFormStore();
    const navigate = useNavigate();

    const handleLogOut = () => {
        setLoading(true);
        setTimeout(() => {

            resetStore();
            navigate('/login');
            setLoading(false);
          }, 5000);
        
    }

    return (
        <>
            {loading && <Loader />}
            <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pt-0"} mx-auto px-2 w-full h-full md:max-w-[30rem] md:max-h-[20.5rem] flex flex-col justify-center items-center`}>
            <div className="border-none flex flex-col justify-center items-center gap-[2.5rem] md:rounded-3xl">
                <LogOutLarge />
                <div className="flex flex-col md:gap-[2.5rem] gap-[9.75rem]">
                <SheetHeader className="flex flex-col items-center justify-center gap-3">
                    <SheetTitle className="font-bold text-xl2">Log Out</SheetTitle>
                    <SheetDescription className="text-[454745] text-sm">Are you sure you want to log out? You will lose any unsaved changes</SheetDescription>
                </SheetHeader>
                <div className="flex gap-14 w-full items-center justify-center">
                    <SheetClose className="w-full p-0"><Button variant="destructive" className="w-full rounded-[2.75rem]" onClick={() => {handleLogOut}}>Log out</Button></SheetClose>
                    <SheetClose className="w-full p-0 rounded-[2.75rem] rounded-md text-sm">Cancel</SheetClose>
                </div>
                </div>
            </div>
            </SheetContent>
      </>
       )
}
