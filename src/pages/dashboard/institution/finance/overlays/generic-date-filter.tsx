import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import SharpArrowDown from '@/assets/arrow-down-sharp.svg'
import { RangeListObjTwo } from "./utils";

// pass unique enpoint to this component

export default function GenericDateFilter({ date_list, current }: { date_list : RangeListObjTwo[], current: string}) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const activeRangeLabel = date_list.find(r => r.key === current)?.label;

    const handleRangeSelect = (key: string, index: number) => {
        // set current date with key here
        console.log(key)
        setSelectedIndex(index);
    }

    return (
        <Popover>
            <PopoverTrigger>
                <button className="border border-[#C5C6D0] p-[.625rem] flex gap-5 items-center w-full max-w-fit rounded-lg">
                    <span className="text-[#202A38] text-sm font-semibold">{activeRangeLabel}</span>
                    <img src={SharpArrowDown} />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-fit max-w-fit flex flex-col gap-2 relative">
                <ul className="flex flex-col gap-1 justify-center w-full min-w-[7rem] border-r-2 border-r-[#DDDDDF]">
                    {date_list.map(({ label, key}, index) => (
                        <li key={key}>
                            <button 
                                aria-selected={selectedIndex === index} 
                                onClick={() => handleRangeSelect(key, index)} 
                                className="text-xs font-light text-[#535057] px-[.625rem] py-2 w-full text-left"
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    )
}