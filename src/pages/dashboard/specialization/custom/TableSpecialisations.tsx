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
import { useMediaQuery } from "react-responsive";
import { useSpecializationsStore } from "@/context/specializationsFormStore";
import Loader from "@/components/custom/Loader";

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
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    const { loading, setLoading } = useSpecializationsStore();

     function deleteTableItem(item: any) {
      setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
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
      <>
        {loading && <Loader />}
          <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pt-0"} mx-auto px-2 w-full h-full md:max-w-[30rem] md:max-h-[20.5rem] flex flex-col justify-center items-center`}>
            <div className="border-none flex flex-col justify-center items-center gap-[2.5rem] md:rounded-3xl">
            
                <div className="flex flex-col items-center md:gap-7 gap-[9.75rem]">
                    <div className="flex flex-col items-center gap-7">
                        <DeleteIcon />
                        <SheetHeader className="flex flex-col items-center justify-center gap-3">
                            <SheetTitle className="font-bold text-xl2">Delete</SheetTitle>
                            <SheetDescription className="text-[454745] text-sm md:text-center">Are you sure you want to delete this specialization?</SheetDescription>
                        </SheetHeader>
                    </div> 
                    <div className="flex gap-14 w-full items-center justify-center">
                        <SheetClose className="w-full p-0"><Button variant="destructive" className="w-full rounded-[2.75rem] !py-3 !px-6" onClick={() => {deleteTableItem(data)}}>Log out</Button></SheetClose>
                        <SheetClose className="w-full !py-[1.375rem] !px-6 border border-[#0C0C0F29] rounded-[2.75rem] text-sm">Cancel</SheetClose>
                    </div>
                </div>
            </div>
          </SheetContent>
      </>
    )
  }

  // set up one table component

    return (
      <>
          <Table className="w-full border overflow-scroll">
              <TableHeader>
                <TableRow className="font-bold w-full flex gap-6 justify-between !border-b p-6">
                  <TableHead className="font-bold text-left w-full !h-auto min-w-[10rem]">Specializations</TableHead>
                  <TableHead className="font-bold text-left w-full !h-auto">Keywords</TableHead>
                  <TableHead className="font-bold w-full text-right pr-5 !h-auto ">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {tableArray && (
                  tableArray.map((data: any) => (
                    <TableRow key={data.id} className="flex items-center justify-between gap-6 !px-6 !py-4 !border-none rounded-3xl hover:bg-[#14155E14] cursor-pointer" >
                        <TableCell className="min-w-[10rem]">{data.specialization}</TableCell>
                        <TableCell className="flex gap-1 w-full flex-wrap items-center">
                          {data.keyword.map((item: any, index: number) => (
                              <Badge className="text-black bg-[#192C8A1A] flex gap-1 items-center justify-center hover:bg-[#192C8A1A] !p-1.5 !rounded-lg" key={index}>{item}</Badge>
                          ))}
                        </TableCell>
                        <TableCell className="flex items-center justify-end gap-4">
                          <Sheet>
                            <SheetTrigger className="px-0 text-black" onClick={() => {handleEditClick(data)}}><PencilEdit /></SheetTrigger>
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
                            <SheetTrigger className="px-0"><Delete /></SheetTrigger>
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