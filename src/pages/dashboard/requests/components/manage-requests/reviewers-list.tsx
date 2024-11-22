import CustomTable, { ColumnSetup, CustomCell } from "@/components/custom/CustomTable";
// import SearchIcon from "@/components/custom/Icons/Search";
import { DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import Smile from "@/assets/smile.svg";
import Unhappy from "@/assets/unhappy.svg";
import Unamused from "@/assets/unamused.svg";

export default function ReviewersList() {
    // const [searchTerm, setSearchTerm] = useState("");
    const review_remarks = [
        { id: "1", text: "Satisfactory", color: "#34A853", icon: Smile },
        { id: "2", text: "Unsatisfactory", color: "#D03238", icon: Unhappy },
        { id: "3", text: "Further Review", color: "#608FEB", icon: Unamused },
      ];

    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   setSearchTerm(e.target.value);
    // };
    const columnData: ColumnSetup<any>[] = [
        {
          header: () => (
            <CustomCell
              value={"First Name"}
              className="w-full font-semibold text-[#0C0D0F]"
            />
          ),
          accessorKey: "first_name",
          cell: (info) => (
            <CustomCell
              value={info.getValue()}
              className="w-full  text-black"
            />
          ),
        },
        {
          header: () => (
            <CustomCell
              value={"Last Name"}
              className="w-full  font-semibold text-[#0C0D0F]"
            />
          ),
          accessorKey: "last_name",
          cell: (info) => (
            <CustomCell
              value={info.getValue()}
              className="w-full  text-black"
            />
          ),
        },
        {
          header: () => (
            <CustomCell
              value={"Remark"}
              className="w-full  font-semibold text-[#0C0D0F]"
            />
          ),
          accessorKey: "remark",
          meta: { cellType: "custom" },
          cell: ({ row }) => {
            const item = row.original;
            const remark = review_remarks.find((r) => r.text === item.remark); 

            return (
            <div className="flex  gap-2">
                {remark?.icon && (
                 <span style={{ color: `${remark.color}` }}><img src={remark.icon} style={{ color: `${remark.color}` }}/></span>
                )}
                <span
                style={{ color: remark?.color || "#000" }}
                className="text-sm"
                >
                {item.remark}
                </span>
            </div>
            );

          }
        },
      ];
    return (
        <>
           
            <DialogContent className="fixed !w-full !max-w-[50rem] h-[90%] mx-auto ">
              <div className="w-full pt-[5.5rem] px-[3.5rem] overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1.5 scrollbar-thumb-gray-500">
                <div className="flex flex-col justify-start gap-[1.875rem] mx-auto ">
                  <div className="flex flex-col justify-start gap-[1.875rem] bg-white z-[99] w-full mx-auto">
                    <h1 className="font-semibold text-[1.875rem]">
                      Reviewers
                    </h1>
                  </div>
                  <div className="w-full max-w-[98%]">
                    <CustomTable
                      columns={columnData}
                      data={assigned_reviewers}
                      localSearch={searchTerm}
                      setLocalSearch={setSearchTerm}
                      customTableClassName="p-5 w-full "
                      customHeaderRowClassName="bg-[#14155E14] border-b-[#0E0F0C1F] !my-3 !py-2 !px-6 rounded-[.625rem] flex justify-between"
                      customRowClassName="!border-b-[#0E0F0C1F] !border !border-b !my-3 !px-6 !py-0 hover:bg-[#14155E14] !rounded-[.625rem] flex justify-between"
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
        </>
      );
}

const assigned_reviewers = [
    {
        id: "1",
        first_name: "Mary",
        last_name: "Catherine",
        remark: "Unsatisfactory"

    },
    {
        id: "2",
        first_name: "Mary",
        last_name: "Catherine",
        remark: "Unsatisfactory"

    },
    {
        id: "3",
        first_name: "Joe",
        last_name: "Doe",
        remark: "Satisfactory"
    },
    {
        id: "4",
        first_name: "Joe",
        last_name: "Doe",
        remark: "Satisfactory"
    },
    {
        id: "5",
        first_name: "Joe",
        last_name: "Doe",
        remark: "Unsatisfactory"
    },
    
]
