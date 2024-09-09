import SideBar from "./sideBar-Nav";
import { SheetClose, SheetContent } from "@/components/ui/sheet";

export default function ApplicationSummary() {
    return(
        <>
            <SheetContent side="bottom" className="overflow-y-scroll h-full md:!p-0">
                   <div className="flex justify-between px-5">
                        <SideBar />
                   <SheetClose>X</SheetClose>
                   </div>
            </SheetContent>
        </>
    );
}