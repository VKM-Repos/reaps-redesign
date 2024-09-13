import { ColumnSetup } from "@/lib/helpers";
import CustomTable from "@/components/custom/CustomTable";

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
            header: "Category",
            accessor: "description",
            cellType: 'text',
            headerClass: "min-w-[18rem] text-[#454747] font-semibold text-left w-full !text-[18px]",
            cellClass: " min-w-[18rem] w-full text-sm flex items-center"
        },
        {
            header: "Ethical Approval Request Fee",
            accessor: "amount",
            cellType: 'text',
            headerClass: "w-full min-w-[18rem] text-[#454747] font-semibold !text-[18px] flex justify-end",
            cellClass: "w-full min-w-[18rem] font-bold flex justify-end text-sm text-black py-[.875rem] px-4"
        },

    ]
    return (
        <>
          <CustomTable columns={columnData} data={categories}/>   
        </>
    )
}