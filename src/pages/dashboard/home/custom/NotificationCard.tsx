import { 
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
 } from "../../../../components/ui/sheet"
 import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "../../../../components/ui/button"
import ArrowRight from "../../../../components/custom/Icons/ArrowRight"
import HoverCancel from "@/components/custom/Icons/HoverCancel"

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
                    <button className="flex flex-1 w-full items-center justify-between gap-4 p-5 font-medium rounded-none hover:rounded-lg border-0 hover:border-none hover:bg-[#14155E14] !border-b !border-[#0C0C0F29]">
                        <div className="flex flex-1 justify-between items-center">
                            <p className="text-xs text-left md:text-base">{title}</p>
                            <p className="text-xs text-[#454745] align-middle">{time}</p>
                        </div>
                        <ArrowRight />
                    </button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-[1rem]">
                        <SheetClose className="md:absolute md:right-6 !w-fit md:mx-auto py-0 md:!px-0 pl-4 flex items-center justify-start opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
                        <NotificationDetails id={id} title={title}  />
                    </div>
                    
                </SheetContent>
            </Sheet>
        </div>    
    </>
)
}


type DetailsProps = {
    id?: string;
    title: string;
}

 function NotificationDetails({title}: DetailsProps) {
  return (
    <div className="px-2.5 py-4 w-full flex flex-col gap-8 mx-auto justify-center">
            <div className="flex flex-col border-[#0E0F0C1F] border-b justify-center">
                <p className="text-lg w-[90%] mx-auto font-bold md:mb-4 mb-8 md:mr-16">{title}</p>
            </div>
            <div className="flex flex-col gap-8">
                <p className="text-sm text-[#6A6C6A]">Your request for ethics approval has been approved by your institution, for editing, as requested by your reviewer.</p>
                <Table className="flex flex-col gap-11">
                    <TableCaption className="font-bold !text-[1.125rem] text-[#040C21] text-left">Submission details</TableCaption>
                    <TableBody className="flex flex-col gap-5">
                        {rows.map((row) => (
                            <TableRow className="text-sm text-[#6A6C6A] !border-0 flex flex-col md:flex-row gap-4 md:gap-8 items-left md:items-center justify-between" key={row.tableTitle}>
                                <TableCell className="font-bold">{row.tableTitle}</TableCell>
                                <TableCell className="w-full md:text-right">{row.tableDescription}</TableCell>
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