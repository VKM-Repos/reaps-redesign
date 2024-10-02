import { SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";
import LogOutLarge from "./Icons/LogOutLarge";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { useNavigate } from "react-router-dom";

export default function Logout( {setLoading}: {setLoading: any} ) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { resetStore } = useOnboardingFormStore();
    const navigate = useNavigate();
    

    const handleLogOut = () => {
        setLoading(true);
        setTimeout(() => {
            resetStore();
            navigate('/login');
            setLoading(false);
          }, 3000);  
    }

    return (
        <>
            <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pt-0"} mx-auto px-2 w-full h-full md:max-w-[30rem] md:max-h-[20.5rem] flex flex-col justify-center items-center`}>
            <div className="border-none flex flex-col justify-center items-center gap-[2.5rem] md:rounded-3xl">
            
                <div className="flex flex-col items-center md:gap-7 gap-[9.75rem]">
                    <div className="flex flex-col items-center gap-7">
                        <LogOutLarge />
                        <SheetHeader className="flex flex-col items-center justify-center gap-3">
                            <SheetTitle className="font-bold text-xl2">Log Out</SheetTitle>
                            <SheetDescription className="text-[454745] text-sm md:text-center">Are you sure you want to log out? You will lose any unsaved changes</SheetDescription>
                        </SheetHeader>
                    </div> 
                    <div className="flex gap-10 w-full items-center justify-center">
                        <SheetClose className="w-full max-w-[12rem] p-0"><Button variant="destructive" className="w-full rounded-[2.75rem] !py-3 !px-6" onClick={() => {handleLogOut()}}>Log out</Button></SheetClose>
                        <SheetClose className="w-full max-w-[12rem] !py-3 !px-6 border border-[#0C0C0F29] rounded-[2.75rem] text-sm">Cancel</SheetClose>
                    </div>
                </div>
            </div>
            </SheetContent>
      </>
       )
}
