import SideBar from "./sideBar-Nav";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import Cancel from "@/components/custom/Icons/Cancel";
import Summary from "./InfoSummary";



export default function ApplicationSummary() {
    return(
        <>
            <SheetContent side="bottom" className="overflow-y-scroll h-full md:!p-0 rounded-t-lg ">
                   <section className="w-full flex relative">
                        <main className="md:top-32 absolute w-full flex">
                            <div className="px-10 w-[25%]">
                                    <SideBar />
                            </div>
                            <div className="w-[]">
                                 {/* <Information />  */}
                                 <Summary />
                            </div>
                        </main>
                        <main className="w-full border-b">
                            <div className="flex justify-between w-[70%] md:float-end md:px-10">
                                <h1 className="text-[1.7rem] font-semibold">Application summary</h1>
                                <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit"><Cancel /></SheetClose>
                            </div>
                        </main>
                   </section>
            </SheetContent>
        </>
    );
}