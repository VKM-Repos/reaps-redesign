import Cancel from "@/components/custom/Icons/Cancel";
import StatusTracker from "./StatusTracker";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import Summary from "./Summary";


const statuses = [
    "Request Submitted",
    "Payment Confirmed",
    "Assigned to a Reviewer",
    "Review in Progress",
    "Approval"
]


export default function ViewRequests() {
    return (
        <>
            <SheetContent side="bottom" className="h-full overflow-y-scroll md:!p-0">
                <div className="w-full relative">
                    <StatusTracker currentStatus="Payment Confirmed" statuses={statuses}/>
                    <div className="mx-auto md:p-2 md:border-b md:border-t-0 w-full">
                        <div className="w-full md:w-[90%] mx-auto flex justify-between md:justify-unset">
                            <div className="p-2 w-full">
                                <h1 className="md:text-center font-semibold text-xl md:text-xl2">Your application Summary</h1>
                            </div>
                            <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit"><Cancel /></SheetClose>
                        </div>
                        <div className="mx-auto my-0 md:absolute md:right-0 md:w-10/12">
                            <div className="w-[85%] mx-auto">
                                <Summary />
                            </div>
                    
                        </div>
                    </div>
                </div>
            </SheetContent>
        </>
      
        
    )
}