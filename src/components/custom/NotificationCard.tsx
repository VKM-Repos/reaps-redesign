import { 
    Sheet,
    SheetContent,
    SheetTrigger
 } from "../ui/sheet"
import ArrowRight from "./Icons/ArrowRight"

type Props = {
    title: string,
    time: string,
    content?: string,
    value: string,
}

export default function NotificationCard({title, time, content}: Props) {
return (
    <>
        <div className="!focus:outline-none !no-transition !hover:border-none w-full">
            <Sheet>
                <SheetTrigger asChild>
                    <div className="flex flex-1 items-center justify-between gap-4 p-5 font-medium">
                        <div className="flex flex-1 justify-between items-center">
                            <p className="text-xs md:text-base">{title}</p>
                            <p className="text-xs text-[#454745]">{time}</p>
                        </div>
                        <ArrowRight />
                    </div>
                </SheetTrigger>
                <SheetContent side="right">
                    {content}
                </SheetContent>
            </Sheet>
        </div>    
    </>
)
}