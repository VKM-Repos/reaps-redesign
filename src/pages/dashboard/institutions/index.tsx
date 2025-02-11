import PageTitle from "@/components/custom/PageTitle";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import { Loader } from "lucide-react";

const Institutions = () => {
  const isPending = false;
  return (
    <TransitionElement>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle title="Institutions" actions={<>add </>} />
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center"></div>
        <TableWrapper search={<SearchGlobal />} filter={null} actions={null}>
          {isPending ? <Loader /> : <>table</>}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
};

export default Institutions;
