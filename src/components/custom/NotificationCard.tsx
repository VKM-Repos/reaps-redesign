import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"

type Props = {
    title: string,
    time: string,
    content?: string,
    value: string,
}

export default function NotificationCard({title, time, content, value}: Props) {
return (
    <>
        <AccordionItem value={value} className="!focus:outline-none !no-transition !hover:border-none">
            <AccordionTrigger>
                <div className="flex flex-1 justify-between items-center">
                        <p className="text-xs md:text-base">{title}</p>
                        <p className="text-xs text-[#454745]">{time}</p>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {content}
            </AccordionContent>
        </AccordionItem>
    </>
)
}