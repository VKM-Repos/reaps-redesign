import SideBar from "./sideBar-Nav";
import { SheetClose, SheetContent } from "@/components/ui/sheet";

export default function ApplicationSummary() {
    return(
        <>
            <SheetContent side="bottom" className="overflow-y-scroll h-full md:!p-0 rounded-t-lg ">
                   <section className="w-full flex">
                        <div className="px-5 w-[20%]">
                                <SideBar />
                        </div>
                        <SheetClose>X</SheetClose>
                   </section>
            </SheetContent>
        </>
    );
}