import CustomTable, { ColumnSetup, CustomCell } from "@/components/custom/CustomTable";
import SearchIcon from "@/components/custom/Icons/Search";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { assignReviewerData } from "@/lib/helpers";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useState } from "react";

export default function AssignReviewer(
    { setLoader }: 
    { setLoader: (loading: boolean) => void }) {
    const { setReviewer, setSuccess } = useRequestsStore();
    const [ numOfReviewers, setNumOfReviewers ] = useState(0);
    const [assignedReviewers, setAssignedReviewers] = useState<{ [key: string]: boolean }>({});

    function submitReviewerData(reviewer: { id: string, firstName: string, lastName: string, email: string }) {
        if (numOfReviewers >= 2 || assignedReviewers[reviewer.id]) return;
        setLoader(true);
        setReviewer({ firstName: reviewer.firstName, lastName: reviewer.lastName });

        setTimeout(() => {
            setLoader(false);
            setTimeout(() => {
                setSuccess(true);
                setNumOfReviewers((prev) => prev + 1);
                setAssignedReviewers((prev) => ({ ...prev, [reviewer.id]: true }));
            }, 500);
        }, 3000);
    }

    const columnData: ColumnSetup<any>[] = [
        {
            header: () => <CustomCell value={"First Name"} className="w-full min-w-[15rem] font-semibold text-[#0C0D0F]"/>,
            accessorKey: "firstName",
            cell: (info) => <CustomCell value={info.getValue()} className="w-full min-w-[15rem] text-black" />
        },
        {
            header: () => <CustomCell value={"Last Name"} className="w-full min-w-[15rem] font-semibold text-[#0C0D0F]"/>,
            accessorKey: "lastName",
            cell: (info) => <CustomCell value={info.getValue()} className="w-full min-w-[15rem] text-black" />
        },
        {
            header: () => <CustomCell value={"Email"} className="w-full min-w-[18rem] font-semibold text-[#0C0D0F]"/>,
            accessorKey: "email",
            cell: (info) => <CustomCell value={info.getValue()} className="w-full min-w-[18rem] text-black" />
        },
        {
            accessorKey: "custom",
            header: () => <CustomCell value={"Action"} className="w-full md:max-w-[3rem] flex items-start" />,
            meta: { cellType: "custom" },
            cell: ({ row }) => {
                const item = row.original;
                const isAssigned = assignedReviewers[item.id];
                const maxAssigned = numOfReviewers >= 2;

                return (
                    <button
                        disabled={isAssigned || maxAssigned}
                        className={`${isAssigned || maxAssigned ? "bg-ghost text-ghost-foreground" : "bg-primary text-white"} py-3 px-6 font-semibold rounded-[0.5rem] max-w-fit`}
                        onClick={() => submitReviewerData(item)}
                    >
                        {isAssigned ? 'Assigned' : 'Assign'}
                    </button>
                        
                )
            }
        },
    ]

    const [ searchTerm, setSearchTerm ] = useState('');


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className="w-full mt-[5.5rem] px-[3.5rem] overflow-y-scroll">
                <div className="flex flex-col justify-start gap-[1.875rem] mx-auto">
                    <div className="flex flex-col justify-start gap-[1.875rem] fixed bg-white z-[99] w-full max-w-[92%]">
                        <h1 className="font-semibold text-[1.875rem]">Assign Reviewer</h1>
                        <div className="flex justify-between">
                            <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem] max-w-[21rem]">
                                <SearchIcon />
                                <input 
                                    name="search"
                                    placeholder="Search"
                                    type="search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="border-none hover:border-none focus:border-none w-full focus-visible:outline-none text-sm"
                                />
                            </div>
                            <DialogClose disabled={numOfReviewers < 1}>
                                {/* assign at least one reviewer before close */}
                                <Button variant={numOfReviewers < 1 ? "ghost" : "default"} className="!py-3 !px-6 font-semibold rounded-[0.5rem] w-full max-w-[9.375rem]">Finish</Button>
                            </DialogClose> 
                        </div>   
                    </div>
                    <div className="w-full mt-[8rem]">
                        <CustomTable 
                            columns={columnData} 
                            data={assignReviewerData} 
                            localSearch={searchTerm}
                            setLocalSearch={setSearchTerm}
                            customTableClassName="p-5"
                            customHeaderRowClassName="bg-[#14155E14] border-b-[#0E0F0C1F] !my-3 !py-2 !px-6 rounded-[.625rem]"
                            customRowClassName="!border-b-[#0E0F0C1F] !border !border-b !my-3 !px-6 !py-0 hover:bg-[#14155E14] !rounded-[.625rem]"
                        /> 
                    </div>
                </div>
            </div>
        </>
      
    )
}