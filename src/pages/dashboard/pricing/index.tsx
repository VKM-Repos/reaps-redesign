import CategoryTable from "./category";
import { categories } from "../requests/components/ethical-request-approval/data/categories";
import { TransitionElement } from "@/lib/transitions";
import PageTitle from "@/components/custom/PageTitle";
import TableWrapper from "@/components/custom/TableWrapper";
import SearchGlobal from "@/components/custom/SearchGlobal";
import { Loader } from "lucide-react";

export default function Pricing() {
  const isPending = false;

  return (
    <>
      <TransitionElement>
        <div className="flex flex-col gap-[1.25rem]">
          <PageTitle
            title="Pricing"
            actions={null}
            description="The pricing page helps you to get information on what you will be
        charged based on your category as a researcher."
          />
          <div className="mx-auto my-0 flex w-full flex-col items-center justify-center"></div>
          <TableWrapper search={<SearchGlobal />} filter={null} actions={null}>
            {isPending ? <Loader /> : <CategoryTable categories={categories} />}
          </TableWrapper>
        </div>
      </TransitionElement>
    </>
  );
}
