import BlueCheckmark from "@/components/custom/Icons/BlueCheckmark";
import Line from "@/components/custom/Icons/Line";
import Record from "@/components/custom/Icons/Record";
import StatusHelp from "@/components/custom/Icons/StatusHelp";
import { Button } from "@/components/ui/button";


type StatusTrackerProps = {
    currentIndex: number,
    currentStatus: string,
    statuses: string[],
    isApproval: boolean,
    handlePrint: () => void
}
export default function StatusTracker({ currentIndex, currentStatus, isApproval, statuses, handlePrint }: StatusTrackerProps) {

    return (
        <div className="max-w-[24.375rem] hidden md:block w-full flex flex-col fixed py-12 px-4 mx-auto">
            <div className="max-w-[14.7rem] w-full mx-auto flex flex-col gap-8 py-16">
                <div className="flex gap-2 items-center justify-start">
                    <h1 className="font-semibold border-b-2 border-[#FFD13A] text-[1.625rem]">Status Tracker</h1>
                    <StatusHelp />
                </div>
                <div className="flex flex-col justify-start items-start">
                   {statuses.map((status, index) => (
                     <div key={index}>
                    {status === 'Approval' ?
                        // if declined, change color to destructive and add destructive info sign
                             <div className="flex gap-2 items-center justify-start w-full text-[#14155E]">
                                {index <= currentIndex ? <BlueCheckmark />: <Record />}

                                <p className={`${currentStatus === status ? 'text-primary' : 'text-[#6A6C6A]'} font-semibold !text-sm`}>{status}</p>
                            </div>
                            :
                            <> 
                            {/* general status = tracker, summarised status */}
                                <div className="flex gap-2 items-center justify-center text-[#14155E]">
                                    {index <= currentIndex ? <BlueCheckmark />: <Record />}
                                    <p className={`${index <= currentIndex ? 'text-primary' : 'text-[#6A6C6A]'} font-semibold text-sm`}>{status}</p>
                                </div>
                                <div className="flex items-center px-4 py-1 justify-start w-full text-[#6A6C6A]">
                                    <Line />
                                </div>
                            </> 
}
                    </div>         
                    )
                   )
                }
                </div>
                <div className="w-full">
                    <div className='w-full my-4 flex items-center justify-center'><Button onClick={handlePrint} className={`${isApproval? 'text-white rounded-2 py-3 !bg-primary ' : 'text-[#6A6C6A] rounded-[2.75rem] py-[1.375rem] !max-w-[9.375rem'} !w-full font-semibold px-6 border border-[#0C0C0F29] bg-inherit hover:bg-inherit hover:border-[#0C0C0F29]`} disabled={isApproval ? false : true}>Print</Button></div>
                </div>
            </div>
        </div>
    )
}