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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import DeleteIcon from "@/components/custom/Icons/DeleteIcon";
import { DialogClose } from "@radix-ui/react-dialog";
import EditDialog from "../../../../components/custom/EditDialog";

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
      setTableArray((prevTableArray) => prevTableArray.filter((data) => data.id !== item.id));
     } 
    //  const deleteTableItem = (item: any) => {
    //   console.log("Item to delete:", item);
    //   setTableArray((prevTableArray) => {
    //     const updatedArray = prevTableArray.filter((data) => data.id !== item.id);
    //     console.log("Updated tableArray after deletion:", updatedArray);
    //     return updatedArray;
    //   });

  

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


  const RenderDeleteDialog = (data: any) => {
    
    return (
      <DialogContent className="items-center justify-center px-2 md:max-w-[25rem] md:max-h-[26.5rem] rounded-3xl border-none p-6 w-full flex flex-col gap-[2.5rem]">
        <DeleteIcon />
        <DialogHeader className="flex flex-col items-center justify-center gap-3">
          <DialogTitle className="font-bold text-xl2">Delete</DialogTitle>
          <DialogDescription className="text-[454745] text-sm">Are you sure you want to delete this specialization</DialogDescription>
        </DialogHeader>
        <div className="flex gap-14 w-full items-center justify-center">
          <DialogClose><Button variant="destructive" className="w-full" onClick={() => {deleteTableItem(data)}}>Delete</Button></DialogClose>
          <DialogClose><Button variant="ghost" className="w-full">Cancel</Button></DialogClose>
        </div>
      </DialogContent>
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
                    <TableRow key={data.id} className="flex items-center justify-between gap-6 !p-6 !border-none" >
                        <TableCell className="min-w-[10rem]">{data.specialization}</TableCell>
                        <TableCell className="flex gap-2 w-full flex-wrap items-center">
                          {data.keyword.map((item: any, index: number) => (
                              <Badge className="text-black bg-[#192C8A1A] flex gap-1 items-center justify-center hover:bg-[#192C8A1A]" key={index}>{item} </Badge>
                          ))}
                        </TableCell>
                        <TableCell className="flex justify-end">
                          <Dialog>
                            <DialogTrigger onClick={() => {handleEditClick(data)}}><PencilEdit /></DialogTrigger>
                              {currentEditData && 
                              <EditDialog 
                              step={step}
                              specialization={currentEditData.specialization}
                              keywordArray={currentEditData.keyword}
                              handleNext={handleNext}
                              onSaveSpecializations={handleSaveSpecialization}
                              onSaveKeywords={handleSaveKeywords}/>}
                          </Dialog>
                          <Dialog>
                            <DialogTrigger><Delete /></DialogTrigger>
                            <RenderDeleteDialog data={data} tableArray={tableArray}/>
                          </Dialog>    
                        </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
          </Table>
       
      </> 
    )
  }

