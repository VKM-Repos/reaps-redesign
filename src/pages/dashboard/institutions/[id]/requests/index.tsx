import FilterGlobal from "@/components/custom/FilterGlobal";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import { useGET } from "@/hooks/useGET.hook";
import AllRequestTable from "./table";
import Loader from "@/components/custom/Loader";

const InstitutionRequestsPage = () => {
  const { data, isPending } = useGET({
    url: `requests`,
    queryKey: ["All_requests"],
    enabled: true,
  });
  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header title="Requests" actions={null} />

          <TableWrapper
            search={<SearchGlobal />}
            filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
            actions={null}
          >
            {isPending ? <Loader /> : <AllRequestTable data={data} />}
          </TableWrapper>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionRequestsPage;
