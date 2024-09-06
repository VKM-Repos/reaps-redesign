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
import {
  Sheet,
  SheetTrigger
} from "@/components/ui/sheet"
import { useState } from "react";
import EditSpecializations from "../edit-specializations";
import { useSpecializationsStore } from "@/store/specializationsFormStore";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
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
    const { loading, setLoading } = useSpecializationsStore();

     function deleteTableItem(item: any) {
      setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
      setTableArray((prevTableArray) => prevTableArray.filter((data) => data.id !== item.id)
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




    return (
      <>
          {loading && <Loader />}
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
                              {currentEditData && (
                                <EditSpecializations
                                  step={step}
                                  specialization={currentEditData.specialization}
                                  keywordArray={currentEditData.keyword}
                                  handleNext={handleNext}
                                  onSaveSpecializations={handleSaveSpecialization}
                                  onSaveKeywords={handleSaveKeywords}
                                />
                              )}
                          </Sheet>
                          <Sheet>
                            <SheetTrigger className="px-0"><Delete /></SheetTrigger>
                            <RenderDeleteSheet text="Are you sure you want to delete this specialization?" data={data} deleteItem={(data) => {deleteTableItem(data)}} />
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
