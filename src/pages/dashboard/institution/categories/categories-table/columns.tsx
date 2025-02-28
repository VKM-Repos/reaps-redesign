import type { ColumnDef } from "@tanstack/react-table";
import { CustomCell } from "@/components/custom/CustomTable";
import AddCategory from "../add-category";

type Category = {
  price: number;
  description: string;
  category: string;
};

const columns: Array<ColumnDef<Category>> = [
  {
    header: () => (
      <CustomCell
        value={"Category Name"}
        className="font-bold w-full min-w-[18rem]"
      />
    ),
    accessorKey: "category",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[18rem] w-full overflow-x-hidden"
      />
    ),
  },
  {
    header: () => (
      <CustomCell
        value={"Description"}
        className="font-bold w-full min-w-[18rem]"
      />
    ),
    accessorKey: "description",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[18rem] w-full overflow-x-hidden"
      />
    ),
  },
  {
    header: () => (
      <CustomCell value={"Fee"} className="font-bold w-full min-w-[10rem]" />
    ),
    accessorKey: "price",
    cell: ({ row }) => {
      const { price } = row.original;
      return <div className="w-full flex gap-1 min-w-[10rem]">₦{price}</div>;
    },
  },
  {
    header: "",
    accessorKey: "action",
    minSize: 50,
    maxSize: 100,
    cell: ({ row }) => (
      <div className="flex place-content-end items-center gap-4">
        <AddCategory action="update" details={row.original} />
      </div>
    ),
  },
];

export default columns;
