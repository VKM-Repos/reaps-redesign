import { 
    Sheet,
    SheetContent,
    SheetTrigger
 } from "../ui/sheet"
 import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "../ui/button"
import ArrowRight from "./Icons/ArrowRight"

type Props = {
    title: string,
    time: string,
    id: string,


}

const rows = [
    {
    tableTitle: "Title",
    tableDescription: "Testing the mail",
    },
    {
        tableTitle: "Objective of the study",
        tableDescription: "testing if the applicant gets the mail",
    },
    {
        tableTitle: "Institution",
        tableDescription: "University of Abuja Teaching Hospital (UATH)",
    },
    {
        tableTitle: "Date of creation",
        tableDescription: "2023-08-07",
    },
    {
        tableTitle: "Time",
        tableDescription: "15:20:56"
    }
]


// useGET to fetch data by id param


export default function NotificationCard({title, time, id}: Props) {    

return (
    <>
        <div className="!focus:outline-none !no-transition !hover:border-none w-full">
            <Sheet>
                <SheetTrigger asChild>
                    <button className="flex flex-1 w-full items-center justify-between gap-4 p-5 font-medium">
                        <div className="flex flex-1 justify-between items-center">
                            <p className="text-xs md:text-base">{title}</p>
                            <p className="text-xs text-[#454745]">{time}</p>
                        </div>
                        <ArrowRight />
                    </button>
                </SheetTrigger>
                <SheetContent side="right">
                    <NotificationDetails id={id} title={title}  />
                </SheetContent>
            </Sheet>
        </div>    
    </>
)
}




type DetailsProps = {
    id: string;
    title: string;
}

 function NotificationDetails({id, title}: DetailsProps) {
  return (
    <div className="px-2.5 py-4 w-full flex flex-col gap-8 mx-auto justify-center">
            <div className="mt-24 md:mt-0 px-8 flex flex-col border-[#0E0F0C1F] border-b justify-center">
                <p className="text-lg font-bold md:mb-4 mb-8">{title}</p>
            </div>
            <div className="flex flex-col gap-8">
                <p className="text-sm text-[#6A6C6A]">{id}</p>
                <p className="text-sm text-[#6A6C6A]">Your request for ethics approval has been approved by your institution, for editing, as requested by your reviewer.</p>
                <Table className="flex flex-col gap-11">
                    <TableCaption className="font-bold !text-[1.125rem] text-[#040C21] text-left">Submission details</TableCaption>
                    <TableBody className="flex flex-col gap-5">
                        {rows.map((row) => (
                            <TableRow className="text-sm text-[#6A6C6A] !border-0 flex flex-col md:flex-row gap-2 items-left md:items-center justify-between" key={row.tableTitle}>
                                <TableCell className="font-bold">{row.tableTitle}</TableCell>
                                <TableCell>{row.tableDescription}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="!border-0 w-full">
                        <Button className="w-full !focus:outline-none">View Request</Button>
                    </TableFooter>
                </Table>
            </div>
        </div>
  )
}