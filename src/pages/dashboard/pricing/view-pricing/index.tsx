import CustomTable, { ColumnSetup, CustomCell } from "@/components/custom/CustomTable";

type CategoryProps = {
    categories: {
        id: string;
        description: string;
        amount: string;
    }[]
}

export default function CategoryTable({ categories }: CategoryProps) {
  
    const columnData: ColumnSetup<any>[]= [
        {
            header: () => <CustomCell value={"Category"} className="min-w-[18rem] text-[#454747] font-semibold text-left w-full !text-[18px]" />,
            accessorKey: "description",
            cell: (info) => <CustomCell value={info.getValue()} className="min-w-[18rem] w-full text-sm flex items-center" />,
        },
        {
            header: () => <CustomCell value={"Ethical Request Approval Fee"} className="w-full min-w-[18rem] text-[#454747] font-semibold !text-[18px] flex justify-end" />,
            accessorKey: "amount",
            cell: (info) => <CustomCell value={info.getValue()} className="w-full min-w-[18rem] font-bold flex justify-end text-sm text-black py-[.875rem] px-4" />,
        },

    ]
    return (
        <>
          <CustomTable columns={columnData} data={categories} customRowClassName="!py-2 hover:bg-unset"/>   
        </>
    )
}