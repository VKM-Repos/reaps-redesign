import ArrowRight from "@/components/custom/Icons/ArrowRight";
import BlueCheckmark from "@/components/custom/Icons/BlueCheckmark";
import Line from "@/components/custom/Icons/Line";
import Record from "@/components/custom/Icons/Record";
import StatusHelp from "@/components/custom/Icons/StatusHelp";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";


type StatusTrackerProps = {
    currentIndex: number,
    currentStatus: string,
    statuses: string[],
    isApproval: boolean,
    handlePrint: () => void,
    setShowTracker: React.Dispatch<React.SetStateAction<boolean>>,
}
export default function StatusTracker({ currentIndex, currentStatus, isApproval, statuses, handlePrint, setShowTracker }: StatusTrackerProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 737px)'});
    const handleFunc = () => {
        setShowTracker(false);
    }

    return (
        <div className={`${isMobile ? '' : 'md:block hidden max-w-[24.375rem] py-12 fixed'}  w-full flex flex-col px-4 mx-auto`}>
            <div className={`${isMobile ? 'gap-6' : 'gap-8 max-w-[14.7rem] py-16'} w-full mx-auto flex flex-col `}>
                <div className="flex gap-2 items-center justify-start">
                    <h1 className="font-semibold border-b-2 border-[#FFD13A] text-[1.625rem]">Status Tracker</h1>
                    <StatusHelp />
                </div>
                {isMobile && 
                <div onClick={handleFunc} className="flex items-center text-[#192C8A] py-2">
                    <div className="rotate-180 flex items-center"><ArrowRight /></div>
                    <p>Back to Summary</p>
                </div>
}
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
                {!isMobile && <div className='w-full my-4 flex items-center justify-start mx-auto'><Button onClick={handlePrint} className={`${isApproval? 'text-white rounded-2 py-3 !bg-primary ' : 'text-[#6A6C6A] rounded-[2.75rem] py-[1.375rem]'}  w-full max-w-[9.375rem] font-semibold px-6 border border-[#0C0C0F29] bg-inherit hover:bg-inherit hover:border-[#0C0C0F29]`} disabled={isApproval ? false : true}>Print</Button></div>}
            </div>
        </div>
    )
}