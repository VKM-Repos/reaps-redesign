import SideBar from "./sideBar-Nav";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import Cancel from "@/components/custom/Icons/Cancel";
// import Summary from "./InfoSummary";
import Summary from "../Summary";

const navLinks = [
    {
        label: "Research Information",
        url: "researchInfo"  
    },
    {
        label: "Application Summary",
        url: "applicationSummary"
    },
    {
        label: "Supporting Document",
        url: "supportingDocument"
    }
]



export default function ApplicationSummary() {
    return(
        <>
            <SheetContent side="bottom" className="overflow-y-scroll h-full md:!p-0 rounded-t-lg flex flex-col">
                   <section className="w-full flex md:relative">
                        <main className="top-28 md:absolute w-full flex flex-col md:flex-row">
                            
                            <div className="md:hidden border w-[90%] mx-6 mb-10">
                                    <div className=" flex justify-between px-5 items-center">
                                            <h1 className="text-[1.5rem] font-semibold">Application Summary</h1>
                                            <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit"><Cancel /></SheetClose>
                                    </div>
                            </div>
                            
                            <div className="px-10 md:w-[25%] hidden md:block">
                                   
                                   <div className='text-[0.875rem] flex-col flex gap-5 w-[20%] fixed'>
                                         {navLinks.map( (links)=>
                                        <a className='w-[80%] h-12 rounded-md p-2 hover:bg-slate-200 text-[#6A6C6A] hover:text-black active:bg-slate-200 text-inherit' href='#'>{links.label}</a>
                                         )}
                                   </div>
                                   <div className=" md:absolute top-60"><SideBar /></div>
                                   
                            </div>
                            <div className="md:w-[75%] w-full px-10">
                                 {/* <Information />  */}
                                 {/* <Summary /> */}
                                 <Summary  />
                            </div>
                        </main>
                        <main className="w-full hidden md:block mx-6 md:mx-auto border-b">
                            <div className="md:flex justify-between px-5 items-center md:w-[65%] md:float-end md:px-10">
                                <h1 className="md:text-[1.7rem] text-[1.5rem] font-semibold">Application Summary</h1>
                                <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit"><Cancel /></SheetClose>
                            </div>
                        </main>
                   </section>
                   <div className="md:hidden mt-auto"><SideBar /></div>
            </SheetContent>
        </>
    );
}