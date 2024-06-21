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
  } from "@/components/ui/table"

type Props = {
  tableData: {
      id: string;
      specialization: string;
      keyword: string[];
  }[]
}


  export default function SpecialisationsTable({tableData}: Props) {

  
    return (
      <>
        
          <Table className="w-full !border ">
              <TableHeader>
                <TableRow className="font-bold flex items-center justify-between gap-7 !border-b !border-[#0E0F0C] p-6">
                  <TableHead className="font-bold !h-auto">Specializations</TableHead>
                  <TableHead className="font-bold !h-auto">Keywords</TableHead>
                  <TableHead className="font-bold !h-auto">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {tableData && (
                  tableData.map((data: any) => (
                      <TableRow key={data.id} className="flex items-center gap-7 justify-between !p-6 !border-none" >
                          <TableCell>{data.specialization}</TableCell>
                          <TableCell className="flex gap-2 w-full flex-wrap items-center justify-center">
                            {data.keyword.map((item: any, index: number) => (
                                <Badge className="text-black bg-[#192C8A1A] flex gap-1 items-center justify-center hover:bg-[#192C8A1A]" key={index}>{item} </Badge>
                            ))}
                          </TableCell>
                          <TableCell className="flex gap-2 justify-end">
                              <button className="p-0"><PencilEdit /></button>
                              <button className="p-0"><Delete /></button>
                          </TableCell>
                      </TableRow>
                  ))
                )}
              </TableBody>
          </Table>
       
      </> 
    )
  }

