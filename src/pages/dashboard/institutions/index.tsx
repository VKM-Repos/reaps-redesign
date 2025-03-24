import PageTitle from "@/components/custom/PageTitle";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import InstitutionTable from "./components/table/institution-list-table";
import { AddInstitutionButton } from "./components/table/add-institution-button";
import { useGET } from "@/hooks/useGET.hook";
import Loader from "@/components/custom/Loader";

const Institutions = () => {
  const { data: institutions, isPending } = useGET({
    url: "institutions",
    queryKey: ["GET-INSTITUTIONS"],
  });

  const institutionData =
    institutions?.map((institution: any) => ({
      ...institution,
      status: "active",
    })) || [];

  return (
    <TransitionElement>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle title="Institutions" actions={<AddInstitutionButton />} />
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center"></div>
        <TableWrapper search={<SearchGlobal />} filter={null} actions={null}>
          {isPending ? (
            <Loader />
          ) : (
            <InstitutionTable data={institutionData || []} />
          )}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
};

export default Institutions;
