import CustomTable, { ColumnSetup } from "@/components/custom/CustomTable";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import View from "@/components/custom/Icons/View";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import SubmittedRequests from "./SubmittedRequests";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";

type TableRequestsProps = {
    tableData: {
        title: string;
        specialization: string;
        submission: string;
        status: string;
    }[]
  }

  type RenderFunctionsProps = {
    item: {
        title: string;
        specialization: string;
        submission: string;
        status: string;
    },
    onDelete: (item: any) => void,
    loading: boolean
  }


  



function RenderFunctions({ item, onDelete, loading }: RenderFunctionsProps) {
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
                <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-center p-3">
                    <DropdownMenuItem>
                        <button className="flex justify-center gap-2 text-black" onClick={() => {return <SubmittedRequests />}}>
                            <span><View /></span>
                            <span>View</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <button className="flex justify-center gap-2 text-black" onClick={() => {return <SubmittedRequests />}}>
                            <span><PencilEdit /></span>
                            <span>Edit</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Sheet>
                            <SheetTrigger className="flex justify-center gap-2 text-black">
                                <DeleteSmallIcon />
                                <span>Delete</span>
                            </SheetTrigger>
                            <RenderDeleteSheet data={item} loading={loading} deleteItem={(item) => {onDelete(item)}} />
                        </Sheet>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



export default function TableRequests({ tableData }: TableRequestsProps) {
    const [loading, setLoading] = useState(false);
    const [tableArray, setTableArray] = useState(tableData);

    function deleteTableItem(item: any) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
      setTableArray((prevTableArray) => prevTableArray.filter((data) => data.title !== item.data.title)
      );
    }

    const columnData: ColumnSetup<any>[]= [
        {
            header: "Title",
            accessor: "title",
            cellType: 'text',
            headerClass: "font-bold w-full min-w-[10rem] ",
            cellClass: "min-w-[10rem] w-full "
    
        },
        {
            header: "Specialization",
            accessor: "specialization",
            cellType: "text",
            headerClass: "font-bold w-full min-w-[6rem]",
            cellClass: "min-w-[6rem] w-full"
        },
        {
            header: "Submission",
            accessor: "submission",
            cellType: "text",
            headerClass: "font-bold w-full min-w-[6rem]",
            cellClass: "min-w-[6rem] w-full"
        },
        {
            header: "Expiry",
            accessor: "expiry",
            cellType: "text",
            headerClass: "font-bold w-full min-w-[6rem]",
            cellClass: "min-w-[6rem] "
        },
        {
            header: "Status",
            accessor: "status",
            cellType: "badge",
             headerClass: "font-bold w-full min-w-[8.75rem]",
            cellClass: "text-left min-w-[8.75rem] flex justify-left"
        },
        {
            accessor: "custom",
            cellType: "custom",
            customRender: (item: any) => (
                <RenderFunctions item={item} onDelete={deleteTableItem} loading={loading} />
              ),
            cellClass: "w-fit",
        }
    ]

    return (
        <>
            <CustomTable columns={columnData} data={tableArray} />
        </>
    )
}