import CustomTable, { ColumnSetup, CustomCell } from "@/components/custom/CustomTable";
import SearchIcon from "@/components/custom/Icons/Search";
import { DialogContent } from "@/components/ui/dialog";
import { assignReviewerData } from "@/lib/helpers";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useState } from "react";


export default function AssignReviewer(
    { setLoader }: 
    { setLoader: (loading: boolean) => void }) {
    const { reviewers, setReviewer, setReviewers, unassignReviewer, setSuccess } = useRequestsStore();
    const [ numOfReviewers, setNumOfReviewers ] = useState(0);
    const [assignedReviewers, setAssignedReviewers] = useState<{ [key: string]: boolean }>({});
    const num = 0;

    function assign(reviewer: { id: string; firstName: string; lastName: string; email: string }) {
        if (numOfReviewers >= 3 || assignedReviewers[reviewer.id]) return;
        
    
        setLoader(true);
        setReviewer({ id: `${ num + 1}`, firstName: reviewer.firstName, lastName: reviewer.lastName });
    
        setTimeout(() => {
            setLoader(false);
            setTimeout(() => {
                setSuccess(true);
                setNumOfReviewers((prev) => prev + 1);
                setAssignedReviewers((prev) => ({ ...prev, [reviewer.id]: true }));
                setReviewers([...reviewers, reviewer]); // Add reviewer to the list
            }, 500);
        }, 3000);
    }
    
    function unassign(reviewerId: string) {
        if (!assignedReviewers[reviewerId]) return; // If not assigned, do nothing
    
        setLoader(true);
    
        setTimeout(() => {
            setLoader(false);
            setTimeout(() => {
                setSuccess(true);
                setNumOfReviewers((prev) => Math.max(0, prev - 1));
                setAssignedReviewers((prev) => {
                    const { [reviewerId]: _, ...rest } = prev; // Remove the reviewer from assigned list
                    return rest;
                });
                unassignReviewer(reviewerId); // Remove reviewer from the list
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
            header: () => <CustomCell value={"Email"} className="w-full min-w-[22rem] font-semibold text-[#0C0D0F]"/>,
            accessorKey: "email",
            cell: (info) => <CustomCell value={info.getValue()} className="w-full min-w-[22rem] text-black" />
        },
        {
            accessorKey: "custom",
            header: () => <CustomCell value={"Action"} className="w-full md:max-w-[3rem] flex items-start" />,
            meta: { cellType: "custom" },
            cell: ({ row }) => {
                const item = row.original;
                const isAssigned = assignedReviewers[item.id];
                // const maxAssigned = numOfReviewers >= 3;

                return (
                    <button
                        // disabled={maxAssigned}
                        className={` bg-primary text-white py-3 px-6 font-semibold rounded-[0.5rem] max-w-fit`}
                        onClick={() => { isAssigned ? unassign(item?.id) : assign(item)}}
                    >
                        {isAssigned ? 'Unassign' : 'Assign'}
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
        <DialogContent className='fixed !w-full !max-w-[70rem] h-[90%] mx-auto'>
            <div className="w-full mt-[5.5rem] px-[3.5rem] overflow-y-scroll">
                <div className="flex flex-col justify-start gap-[1.875rem] mx-auto">
                    <div className="flex flex-col justify-start gap-[1.875rem] bg-white z-[99] w-full mx-auto">
                        <h1 className="font-semibold text-[1.875rem]">Assign Reviewer</h1>
                        <div className="flex justify-between w-full">
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
                        </div>   
                    </div>
                    <div className="w-full max-w-[95%] ">
                        <CustomTable 
                            columns={columnData} 
                            data={assignReviewerData} 
                            localSearch={searchTerm}
                            setLocalSearch={setSearchTerm}
                            customTableClassName="p-5 w-full"
                            customHeaderRowClassName="bg-[#14155E14] border-b-[#0E0F0C1F] !my-3 !py-2 !px-6 rounded-[.625rem]"
                            customRowClassName="!border-b-[#0E0F0C1F] !border !border-b !my-3 !px-6 !py-0 hover:bg-[#14155E14] !rounded-[.625rem]"
                        /> 
                    </div>
                </div>
            </div>
        </DialogContent>
      
    )
}