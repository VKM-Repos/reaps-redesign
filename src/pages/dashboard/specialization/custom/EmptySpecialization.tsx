import { Button } from "../../../../components/ui/button"
import { Sheet, SheetTrigger } from "../../../../components/ui/sheet"
import AddIcon from "../../../../components/custom/Icons/AddIcon"
import Puzzle from "../../../../components/custom/Icons/Puzzle"


type Props = {
    children: React.ReactNode
}

export default function EmptySpecializations({children}: Props) {
    return (
        <>
            <div className="w-[96px] h-[96px] pl-2 mx-auto my-[6rem] rounded-full flex justify-center items-center bg-[#FFD13A] ">
                    <Puzzle />
            </div>
            <div className="flex flex-col gap-8 w-full max-w-[37rem] text-center">
                <h1 className="text-[1.625rem] leading-8 font-bold">Create and manage specializations</h1>
                <p>You can create specializations for your requests, add keywords that fits your request, and manage specialization</p>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="flex gap-4 items-center justify-center py-3 px-6 w-full mx-auto my-0 max-w-[16rem]"><span><AddIcon /></span>Create specialization</Button>
                    </SheetTrigger>
                    {children}
                </Sheet>
        </div>
        </>
        
    )
}