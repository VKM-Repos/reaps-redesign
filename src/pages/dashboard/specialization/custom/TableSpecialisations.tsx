import Delete from "@/components/custom/Icons/Delete";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { useState } from "react";
import DeleteIcon from "@/components/custom/Icons/DeleteIcon";
import EditSpecializations from "../edit-specializations";

type Props = {
  tableData: {
      id: string;
      specialization: string;
      keyword: string[];
  }[]
}




  export default function SpecialisationsTable({tableData}: Props) {

    const [tableArray, setTableArray] = useState(tableData);
    const [currentEditData, setCurrentEditData] = useState<{ id: string; specialization: string; keyword: [] } | null>(null);
    const [step, setStep] = useState<number>(1);

     function deleteTableItem(item: any) {
      setTableArray((prevTableArray) => prevTableArray.filter((data) => data.id !== item.data.id)
      );
     } 

  

  const handleSaveSpecialization = (newSpecialization: string) => {
      if (currentEditData) {
          setCurrentEditData({
              ...currentEditData,
              specialization: newSpecialization,
          });
      }
  };

  const handleSaveKeywords = (newKeywords: string[]) => {
    if (currentEditData) {
        const updatedData = {
            ...currentEditData,
            keyword: newKeywords,
        };
        setTableArray(prevData => prevData.map(item => item.id === updatedData.id ? updatedData : item));
        setCurrentEditData(null);
    }
   
};

  const handleEditClick = (data: { id: string; specialization: string; keyword: [] }) => {
    setCurrentEditData(data);

    setStep(1); 
  };
 

  const handleNext = () => {
    setStep(step + 1);
  }


  const RenderDeleteSheet = (data: any) => {
    
    return (
      <SheetContent side="top" className="inset-y-auto inset-l-auto inset-x-[30%] mx-auto rounded-3xl px-2 p-6">
        <div className="md:max-w-[30rem] md:max-h-[26.5rem] rounded-3xl border-none w-full flex flex-col items-center gap-[2.5rem]">
          <DeleteIcon />
          <SheetHeader className="flex flex-col items-center justify-center gap-3">
            <SheetTitle className="font-bold text-xl2">Delete</SheetTitle>
            <SheetDescription className="text-[454745] text-sm">Are you sure you want to delete this specialization</SheetDescription>
          </SheetHeader>
          <div className="flex gap-14 w-full items-center justify-center">
            <SheetClose className="w-full p-0"><Button variant="destructive" className="w-full rounded-[2.75rem]" onClick={() => {deleteTableItem(data)}}>Delete</Button></SheetClose>
            <SheetClose className="w-full p-0 rounded-[2.75rem] rounded-md text-sm">Cancel</SheetClose>
          </div>
        </div>
      </SheetContent>
    )
  }

    return (
      <>
          <Table className="w-full border overflow-scroll">
              <TableHeader>
                <TableRow className="font-bold w-full flex gap-6 justify-between !border-b p-6">
                  <TableHead className="font-bold text-left w-full !h-auto min-w-[10rem]">Specializations</TableHead>
                  <TableHead className="font-bold text-left w-full !h-auto">Keywords</TableHead>
                  <TableHead className="font-bold w-full text-right !h-auto pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {tableArray && (
                  tableArray.map((data: any) => (
                    <TableRow key={data.id} className="flex items-center justify-between gap-6 !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14] cursor-pointer" >
                        <TableCell className="min-w-[10rem]">{data.specialization}</TableCell>
                        <TableCell className="flex gap-1 w-full flex-wrap items-center">
                          {data.keyword.map((item: any, index: number) => (
                              <Badge className="text-black bg-[#192C8A1A] flex gap-1 items-center justify-center hover:bg-[#192C8A1A] !p-1.5 !rounded-lg" key={index}>{item} </Badge>
                          ))}
                        </TableCell>
                        <TableCell className="flex justify-end">
                          <Sheet>
                            <SheetTrigger onClick={() => {handleEditClick(data)}}><PencilEdit /></SheetTrigger>
                              {currentEditData &&
                              <EditSpecializations
                              step={step}
                              specialization={currentEditData.specialization}
                              keywordArray={currentEditData.keyword}
                              handleNext={handleNext}
                              onSaveSpecializations={handleSaveSpecialization}
                              onSaveKeywords={handleSaveKeywords}/>}
                          </Sheet>
                          <Sheet>
                            <SheetTrigger><Delete /></SheetTrigger>
                            <RenderDeleteSheet data={data} />
                          </Sheet>    
                        </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
          </Table>
       
      </> 
    )
  }


