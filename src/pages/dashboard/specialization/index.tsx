import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import AddSpecialization from "./custom/AddSpecialization";
import SpecializationTable from "./custom/SpecializationTable";
import { SpecializationItems } from "@/types/specialization";

export default function SpecializationPage() {
  const { data: specializationData, isPending } = useGET({
    queryKey: ["specialization", "keywords"],
    url: "specializations",
    withAuth: true,
  });

  const specializations: SpecializationItems[] =
    specializationData?.items || [];

  return (
    <>
      {isPending && <Loader />}
      <div className="flex flex-col gap-[1.25rem]">
        <div className="md:gap-auto mx-auto flex w-full flex-col justify-between gap-5 md:flex-row md:items-center">
          <h1 className="text-[1.875rem] font-bold">Specializations</h1>
          {specializations.length > 0 && <AddSpecialization />}
        </div>
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center">
          <SpecializationTable data={specializations} />
        </div>
      </div>
    </>
  );
}
