import CustomTable, { ColumnSetup } from "@/components/custom/CustomTable";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import View from "@/components/custom/Icons/View";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";
import Loader from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";
import ViewRequests from "../../view-requests";
import { useRequestsStore } from "@/store/RequestFormStore";
import CreateRequests from "../../create-requests";
import { useNavigate } from "react-router-dom";


type TableRequestsProps = {
    tableData: {
        id: string;
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
    loading: boolean,
  }


  const statusColorMap: { [key: string]: { bg: string; text: string } } = {
    Approved: { bg: '#34A85347', text: '#254D4B' },
    Pending: { bg: '#CDD0CD', text: '#333A33' },
    Declined: { bg: '#E7484847', text: '#BF1E2C' },
    Draft: { bg: '#192C8A1A', text: '#040C21' },
    "Under Review": { bg: '#F2C374', text: '#452609' },
  };


function RenderFunctions({ item, onDelete, loading, }: RenderFunctionsProps) {

    const { setStep } = useRequestsStore();
    const navigate = useNavigate();

    const redirectToSummary = () => {
        navigate('/requests/create')
        setStep(5);

    }

    return (
        <>
        {loading && <Loader />}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button><MoreIcon /></button>
            </DropdownMenuTrigger >
            <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
                <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
                        <Sheet>
                            <SheetTrigger className="flex justify-center gap-2 text-black p-3">
                                <View />
                                <span>View</span>
                            </SheetTrigger>
                            <ViewRequests />
                        </Sheet>
                         <div>
                            <button onClick={redirectToSummary} className={` ${item.status === "Draft" ? "text-black" : "text-black/30"} flex justify-center gap-2 p-3`} disabled={item.status !== "Draft"}>
                                <PencilEdit />
                                <span>Edit</span>
                            </button>
                        </div>
                    <Sheet>
                        <SheetTrigger className="flex justify-center gap-2 text-black p-3">
                            <DeleteSmallIcon />
                            <span>Delete</span>
                        </SheetTrigger>
                        <RenderDeleteSheet text="Are you sure you want to delete this request?" data={item} deleteItem={(item) => {onDelete(item)}} />
                    </Sheet>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
        
    )
}

function MobileRenderOption() {
     
}



export default function TableRequests({ tableData }: TableRequestsProps) {
    const [loading, setLoading] = useState(false);
    const [tableArray, setTableArray] = useState(tableData);
    

    function deleteTableItem(item: any) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
      setTableArray((prevTableArray) => prevTableArray.filter((data) => data.id !== item.id)
      );
    }

    const columnData: ColumnSetup<any>[]= [
        {
            header: "Title",
            accessor: "title",
            cellType: 'text',
            headerClass: "font-bold w-full min-w-[18rem] ",
            cellClass: " min-w-[18rem] w-full "
    
        },
        {
            header: "Specialization",
            accessor: "specialization",
            cellType: "text",
            headerClass: "font-bold w-full min-w-[8rem]",
            cellClass: "min-w-[8rem] w-full"
        },
        {
            header: "Submission",
            accessor: "submission",
            cellType: "text",
            headerClass: "font-bold w-full min-w-[8rem]",
            cellClass: "min-w-[8rem] w-full"
        },
        {
            header: "Expiry",
            accessor: "expiry",
            cellType: "text",
            headerClass: "font-bold w-full min-w-[8rem]",
            cellClass: "min-w-[8rem] "
        },
        {
            header: "Status",
            accessor: "status",
            cellType: "custom",
            customRender: (item: any) => {
                return (
                    <>
                        <Badge
                          style={{
                            color: statusColorMap[item.status]?.text || '#000000',
                            backgroundColor: statusColorMap[item.status]?.bg || '#192C8A',
                          }}
                          className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem]"
                        >
                          <div
                            style={{
                              backgroundColor: statusColorMap[item.status]?.text || '#192C8A',
                            }}
                            className="w-[5px] h-[5px] rounded-full"
                          ></div>
                          {item.status}
                        </Badge>
                    </>
                  );
            },
             headerClass: "font-bold w-full min-w-[8.75rem]",
            cellClass: "text-left min-w-[8.75rem] flex justify-left !text-xs"
        },
        {
            accessor: "custom",
            cellType: "custom",
            customRender: (item: any) => (
                <RenderFunctions item={item} onDelete={deleteTableItem} loading={loading} />
              ),
        }
    ]

    return (
        <>
            <CustomTable columns={columnData} data={tableArray} />
        </>
    )
}