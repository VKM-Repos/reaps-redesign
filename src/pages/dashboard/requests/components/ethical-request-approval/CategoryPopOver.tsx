import { Button } from "@/components/ui/button"
import {  DialogContent } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";


type Category = {
    id: string,
    description: string,
    amount: string
}

type CategoryProps = {
    categories: Category[],
    handleNext: Function
}

export default function CategoryPopUp ({ categories, handleNext }: CategoryProps) {
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
        <DialogContent className="w-full max-w-[800px] h-full max-h-[700px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-8">
            <div className="border-[#0E0F0C1F] border-b  flex justify-between items-center text-[#040C21] w-full">
                <p className="pb-4 px-[1.125rem] font-semibold">Select your Category</p>
            </div>
            <Table  className="mx-auto my-0 w-[95%] px-[1.125rem] ">
                <TableHeader>
                    <TableRow className="font-bold w-full flex items-center justify-between p-6 border-y !border-[#0C0C0F29] ">
                        <TableHead className="min-w-[25rem] text-[#454747] font-semibold text-left w-full !h-auto !text-[18px]">Description</TableHead>
                        <TableHead className="text-[#454747] font-semibold text-lg flex justify-center items-center w-full !h-auto !text-[18px]">Amount</TableHead>
                        <TableHead className="text-left w-full !h-auto"></TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody className="overflow-scroll">
                    {categories.map((category, index) => (
                        <TableRow key={index} className="flex items-center justify-between !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14] cursor-pointer">
                            <TableCell className="w-full min-w-[25rem] text-sm text-black">{category.description}</TableCell>
                            <TableCell className="text-sm text-black font-semibold flex justify-center items-center">₦{category.amount}</TableCell>
                            <TableCell className="items-center justify-center flex"><Button variant={clicked ? "default" : "ghost"} onClick={() => {handleSelectedCategories; setClicked(true)}}>Select</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button className="w-full mx-auto w-[95%] py-3 px-6 rounded-1 text-white font-semibold flex justify-center items-center" onClick={() => handleNext} >Continue</Button>
        </DialogContent>
    )
}


