import CustomTable, { ColumnSetup } from "@/components/custom/CustomTable";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import View from "@/components/custom/Icons/View";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import SubmittedRequests from "../SubmittedRequests";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";
import Loader from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";

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


  const statusColorMap: { [key: string]: { bg: string; text: string } } = {
    Approved: { bg: '#34A853', text: '#254D4B' },
    Pending: { bg: '#CDD0CD', text: '#333A33' },
    Declined: { bg: '#E7484847', text: '#BF1E2C' },
    Draft: { bg: '#192C8A14', text: '#040C21' },
    "Under Review": { bg: '#F2C374', text: '#452609' },
  };


function RenderFunctions({ item, onDelete, loading }: RenderFunctionsProps) {

    return (
        <>
        {loading && <Loader />}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button><MoreIcon /></button>
            </DropdownMenuTrigger >
            <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
                <DropdownMenuGroup className="flex flex-col gap-3 justify-center p-3">
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
                    <Sheet>
                        <SheetTrigger className="flex justify-center gap-2 text-black">
                            <DeleteSmallIcon />
                            <span>Delete</span>
                        </SheetTrigger>
                        <RenderDeleteSheet data={item} deleteItem={(item) => {onDelete(item)}} />
                    </Sheet>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
        
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
      setTableArray((prevTableArray) => prevTableArray.filter((data) => data.title !== item.title)
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
            cellType: "custom",
            customRender: (item: string) => {
                return (
                    <>
                        <Badge
                          style={{
                            color: statusColorMap[item]?.text || '#000000',
                            backgroundColor: statusColorMap[item]?.bg || '#192C8A',
                          }}
                          className="flex gap-1 items-center justify-center p-1.5 rounded-lg"
                        >
                          <div
                            style={{
                              backgroundColor: statusColorMap[item]?.text || '#192C8A',
                            }}
                            className="w-[5px] h-[5px] rounded-full"
                          ></div>
                          {item}
                        </Badge>
                    </>
                  );
            },
             headerClass: "font-bold w-full min-w-[8.75rem]",
            cellClass: "text-left min-w-[8.75rem] flex justify-left"
        },
        {
            accessor: "custom",
            cellType: "custom",
            customRender: (items: any) => (
                <RenderFunctions item={items} onDelete={deleteTableItem} loading={loading} />
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