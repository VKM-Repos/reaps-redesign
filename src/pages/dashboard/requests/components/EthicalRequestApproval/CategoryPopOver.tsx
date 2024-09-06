import Cancel from "@/components/custom/Icons/Cancel";
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PopoverClose, PopoverContent } from "@radix-ui/react-popover";
import { useState } from "react";

export type Category = {
    id: string,
    description: string,
    amount: string
}

type CategoryProps = {
    categories: Category[]
}

export default function CategoryPopUp ({ categories }: CategoryProps) {
    const [ selectedCategories, setSelectedCategories ] = useState<Category[]>();
    const [ clicked, setClicked ] = useState(false);
    const handleSelectedCategories = (category: Category, isSelected: boolean) => {
        if(isSelected) {
            setSelectedCategories((prev) => [...(prev as Category[]), category])
        } 
        else {
            setSelectedCategories((prev) =>
                prev?.filter((item) => item.description !== category.description)
            );
        }
        console.log(selectedCategories);
    }



    return (
        <PopoverContent className="pt-[6.25rem] pb-[3.125rem] px-[3.125rem] w-full">
            <div className="border-b-[#0E0F0C1F] flex justify-between items-center text-[#040C21] w-full">
                <h1 className="text-lg">Select your Category</h1>
                <PopoverClose><Cancel /></PopoverClose> 
            </div>
            <Table  className="w-full md:max-w-3/5 border overflow-scroll">
                <TableHeader>
                    <TableRow className="font-bold w-full flex items-center justify-between p-6 !border-y-[#0C0C0F29]">
                        <TableHead className="min-w-[25rem] text-[#454747] font-semibold text-lg text-left w-full !h-auto">Description</TableHead>
                        <TableHead className="text-[#454747] font-semibold text-lg text-left w-full !h-auto">Amount</TableHead>
                        <TableHead className="text-left w-full !h-auto">&nbsp;</TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    {categories.map((category, index) => (
                        <TableRow key={index} className="flex items-center justify-between !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14] cursor-pointer">
                            <TableCell className="text-sm text-black">{category.description}</TableCell>
                            <TableCell className="text-sm text-black font-semibold">{category.amount}</TableCell>
                            <TableCell className="items-center justify-center flex"><Button variant={clicked ? "ghost" : "default"} onClick={() => {handleSelectedCategories; setClicked(true)}}>Select</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </PopoverContent>
    )
}


