import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import SharpArrowDown from '@/assets/arrow-down-sharp.svg'
import { Calendar } from "@/components/ui/calendar";
import { DateRangeType, formatShortDate, getDateRange, preventFutureDateSelection, range_list, RangeKey } from "./utils";

// api can be consumed here, only one component uses this component
export default function DateFilter() {
    const now = new Date();
    const [rangeKey, setRangeKey] = useState<RangeKey>("today");
    const [customRange, setCustomRange] = useState<DateRangeType>({
        start: new Date(now),
        end: new Date(now)
    });
    const [selectedRange, setSelectedRange] = useState<DateRangeType>(getDateRange("today"));
    const activeRangeLabel = range_list.find(r => r.key === rangeKey)?.label;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    
    const handleRangeSelect = (key: RangeKey, index: number, customStart?: Date, customEnd?: Date) => {
        setRangeKey(key);
        const newRange = key === 'custom'
          ? getDateRange(key, customStart, customEnd)
          : getDateRange(key);
      
        setCustomRange(newRange);
        setSelectedRange(newRange);
        setSelectedIndex(index === selectedIndex ? null : index);     
    };


    return (
        <div className="flex items-center gap-[.625rem]">
            <p className="font-medium text-xs">{activeRangeLabel}</p>
            <Popover>
                <PopoverTrigger className="flex items-center justify-center gap-3">
                    <button className="border border-[#C5C6D0] p-[.625rem] flex gap-5 items-center w-full max-w-fit rounded-lg">
                        <span className="text-[#202A38] text-xs">{formatShortDate(customRange.start)}</span>
                        <img src={SharpArrowDown} />
                    </button>
                    {(rangeKey != 'today' && rangeKey != 'yesterday') &&
                       <button className="border border-[#C5C6D0] p-[.625rem] flex gap-5 items-center w-full max-w-fit rounded-lg">
                            <span className="text-[#202A38] text-xs">{formatShortDate(customRange.end)}</span>
                            <img src={SharpArrowDown} />
                        </button>
                    }
                </PopoverTrigger>
                <PopoverContent className="w-full min-w-[8.5rem] max-w-fit flex flex-col gap-2 relative">
                    <p className="font-bold text-[#535057] border-b border-b-[#DDDDDF] absolute w-full left-2 mb-2">Filter</p>
                    <div className="flex gap-2 w-full mt-6">
                        <ul className="flex flex-col gap-1 justify-center w-full min-w-[7rem] border-r-2 border-r-[#DDDDDF]">
                            {range_list.map(({ label, key}, index) => {
                                return(
                                <li key={key}>
                                    <button 
                                        aria-selected={selectedIndex === index} 
                                        onClick={() =>{ handleRangeSelect(key, index, customRange.start, customRange.end);}} 
                                        className="text-xs font-light text-[#535057] px-[.625rem] py-2 w-full text-left"
                                    >
                                        {label}
                                    </button>
                                </li>
                            )})}
                        </ul>
                        <Calendar 
                            mode="range"
                            selected={{ from: selectedRange.start, to: selectedRange.end}}
                            onSelect={(range) => {
                                if (rangeKey !== "custom") return;
                                if (range?.from && range?.to) {
                                    const validRange = preventFutureDateSelection( range.from, range.to );
                                    if(validRange) {
                                        setCustomRange({ start: range.from, end: range.to });
                                        setSelectedRange({ start: range.from, end: range.to });
                                    } else return; 
                                }
                            }}
                            className='w-full'
                            modifiersClassNames={{
                                range_middle: `aria-selected:bg-accent aria-selected:text-accent-foreground ${rangeKey !== 'custom' && '!pointer-events-none'}`,
                            }}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
       
    )
}