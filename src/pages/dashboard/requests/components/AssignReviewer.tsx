import CustomTable, { ColumnSetup, CustomCell } from "@/components/custom/CustomTable";
import SearchIcon from "@/components/custom/Icons/Search";
import Loader from "@/components/custom/Loader";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import { assignReviewerData } from "@/lib/helpers";
import { useState } from "react";

export default function AssignReviewer() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    function submitReviewerData() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        setSuccess(true);
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
                return (
                    <>
                        <button className="py-3 px-6 text-white font-semibold rounded-[0.5rem] bg-primary max-w-fit" onClick={() => submitReviewerData()}>
                            Assign
                        </button>
                        {success &&
                            <Dialog>
                                <DialogContent className="z-[999999]">
                                    <h1 className="font-bold text-[1.625rem]">Assigned</h1>
                                    <p className="text-sm text-center">Reviewer ({item.firstName + " " + item.lastName}) have been assigned to this request</p>
                                    <DialogClose>
                                        <button className="bg-primary rounded text-white font-semibold py-3 px-6">Done</button>
                                    </DialogClose>
                                </DialogContent>
                            </Dialog>
            }
                    </>
                )
            }
        },
    ]

    const { globalFilter, setGlobalFilter } = useGlobalFilter()
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
    };

    return (
        <>
            {loading && <Loader />}
           
            <div className="w-full mt-[5.5rem] px-[3.5rem] overflow-y-scroll">
                <div className="flex flex-col justify-start gap-[1.875rem] mx-auto">
                    <div className="flex flex-col justify-start gap-[1.875rem] fixed bg-white z-[99] w-full max-w-[90%]">
                        <h1 className="font-semibold text-[1.875rem]">Assign Reviewer</h1>
                        <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem] max-w-[21rem]">
                            <SearchIcon />
                            <input 
                                name="search"
                                placeholder="Search"
                                type="search"
                                value={globalFilter}
                                onChange={handleSearchChange}
                                className="border-none hover:border-none focus:border-none w-full focus-visible:outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="w-full mt-[8rem]">
                        <CustomTable 
                            columns={columnData} 
                            data={assignReviewerData} 
                            // globalFilter={searchTerm} 
                            // setGlobalFilter={setSearchTerm}
                            // tableClassName="p-5"
                            // customHeaderRowClassName="bg-[#14155E14] border-b-[#0E0F0C1F] !my-3 !py-2 !px-6 rounded-[.625rem]"
                            // customRowClassName="!border-b-[#0E0F0C1F] !border !border-b !my-3 !px-6 !py-0 hover:bg-[#14155E14] !rounded-[.625rem]"
                        /> 
                    </div>

                </div>
            </div>
        </>
      
    )
}