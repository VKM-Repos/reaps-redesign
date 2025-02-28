import { TransitionElement } from "@/lib/transitions";
import PageTitle from "@/components/custom/PageTitle";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import Loader from "@/components/custom/Loader";

export default function InstitutionActivities() {
  const loading = false;
  return (
    <TransitionElement>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle title="Activities" description="" actions={<></>} />
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center"></div>
        <TableWrapper search={<SearchGlobal />} filter={null} actions={null}>
          {loading ? <Loader /> : <>Table component</>}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
}
