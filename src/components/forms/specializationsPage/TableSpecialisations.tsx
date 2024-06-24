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
import { useState } from "react";

type Props = {
  tableData: {
      id: string;
      specialization: string;
      keyword: string[];
  }[]
}


  export default function SpecialisationsTable({tableData}: Props) {

    const [tableArray, setTableArray] = useState(tableData);

     function deleteTableItem(item: any) {
      setTableArray(tableArray.filter(data => data !== item));
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
                          <TableCell className="flex gap-6 justify-end">
                              <button className="p-0"><PencilEdit /></button>
                              <button className="p-0" onClick={() => {deleteTableItem(data)}}><Delete /></button>
                          </TableCell>
                      </TableRow>
                  ))
                )}
              </TableBody>
          </Table>
       
      </> 
    )
  }

