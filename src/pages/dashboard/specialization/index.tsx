import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import AddSpecialization from "./custom/AddSpecialization";
import SpecializationTable from "./custom/SpecializationTable";
import { SpecializationItems } from "@/types/specialization";
import PageTitle from "@/components/custom/PageTitle";
import TableWrapper from "@/components/custom/TableWrapper";
import SearchGlobal from "@/components/custom/SearchGlobal";
import { TransitionElement } from "@/lib/transitions";

export default function SpecializationPage() {
  const { data: specializationData, isPending } = useGET({
    queryKey: ["specialization", "keywords"],
    url: "specializations",
    withAuth: true,
  });

  const specializations: SpecializationItems[] =
    specializationData?.items || [];

  return (
    <TransitionElement>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle
          title="Specializations"
          actions={specializations.length > 0 && <AddSpecialization />}
        />
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center"></div>
        <TableWrapper search={<SearchGlobal />} filter={null} actions={null}>
          {isPending ? (
            <Loader />
          ) : (
            <SpecializationTable data={specializations} />
          )}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
}
