import { SheetClose, SheetContent } from "@/components/ui/sheet";
import Cancel from "@/components/custom/Icons/Cancel";
import Summary from "../Summary";
import { useState } from "react";
import ReviewerWriteReview from "./reviewer-write";



export default function ReviewerRequestSummary() {
    const [activeSection, setActiveSection] = useState('');

    // navigate to sections on summary page
    const handleNavClick = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
      };
    
    // navigation buttons 
    const NavItem = ({ sectionId, label }: { sectionId: string; label: string }) => (
    <a
        href={`#${sectionId}`}
        className={`w-full h-12 items-center rounded-md px-3 py-4 hover:bg-slate-200 text-[#6A6C6A] hover:text-black ${activeSection === sectionId ? 'bg-slate-200 text-black' : ''}`}
        onClick={handleNavClick(sectionId)}
    >
        {label}
    </a>
    );
 
    return(
        <>
            <SheetContent side="bottom" className="overflow-y-scroll h-full md:!p-0 rounded-t-lg flex flex-col">
                   <section className="w-full flex md:relative">
                        <div className="w-full hidden md:block mx-6 md:mx-auto border-b fixed z-[100] bg-white top-0 py-2">
                            <div className="md:flex justify-between px-5 items-center md:w-[65%] md:float-end md:px-10">
                                <h1 className="md:text-[1.7rem] text-[1.5rem] font-semibold">Application Summary</h1>
                                <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit"><Cancel /></SheetClose>
                            </div>
                        </div>
                        <main className="md:absolute w-full flex flex-col md:flex-row">
                            <div className="md:hidden border w-[90%] mx-6">
                                <div className=" flex justify-between px-5 items-center">
                                    <h1 className="text-[1.5rem] font-semibold">Application Summary</h1>
                                    <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit"><Cancel /></SheetClose>
                                </div>
                            </div>
                            <div className="my-[6.875rem]  px-10 w-full max-w-[20rem] hidden md:block z-50 fixed">
                                <div className='text-[0.875rem] flex-col items-center flex gap-5 '>
                                    <NavItem sectionId="research-info" label="Research Information" />
                                    <NavItem sectionId="application-info" label="Application Information" />
                                    <NavItem sectionId="supporting-document" label="Supporting Document" />
                                    <div className="mt-3 w-full">
                                        <ReviewerWriteReview />
                                    </div>
                                </div>    
                            </div>
                            <div className="my-0 mx-auto md:mt-[3.875rem] md:absolute md:right-10 md:w-full max-w-[90%] md:max-w-[75%]">
                                 <Summary  />
                            </div>
                        </main>
                   </section>
                   <div className="md:hidden mt-auto"><ReviewerWriteReview /></div>
            </SheetContent>
        </>
    );
}

