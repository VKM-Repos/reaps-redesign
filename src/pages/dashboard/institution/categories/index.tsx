import { TransitionElement } from "@/lib/transitions";
import PageTitle from "@/components/custom/PageTitle";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import CategoriesTable from "./categories-table";
import AddCategory from "./add-category";

type Category = {
  price: number;
  description: string;
  category: string;
};

export default function InstitutionCategories() {
  const { data, isPending } = useGET({
    queryKey: ["price", "categories"],
    url: "price-categories",
    withAuth: true,
  });

  const categories: Category[] = data;

  return (
    <TransitionElement>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle
          title="Categories"
          description="The pricing page helps you to get information on what you will be    charged based on your category as a researcher."
          actions={<AddCategory action="new" />}
        />
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center"></div>
        <TableWrapper search={<SearchGlobal />} filter={null} actions={null}>
          {isPending ? <Loader /> : <CategoriesTable data={categories} />}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
}
