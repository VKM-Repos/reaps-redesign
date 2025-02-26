import CustomTable from "@/components/custom/CustomTable";
import EmptyCategory from "../empty-category";
import columns from "./columns";
import AddCategory from "../add-category";

type Props = {
  data: Category[];
};

type Category = {
  price: number;
  description: string;
  category: string;
};

const CategoriesTable = ({ data }: Props) => {
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <CustomTable data={data} columns={columns} />
      ) : (
        <EmptyCategory>
          <AddCategory action="New" />
        </EmptyCategory>
      )}
    </div>
  );
};

export default CategoriesTable;
