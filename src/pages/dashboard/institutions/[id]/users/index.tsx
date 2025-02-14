import FilterGlobal from "@/components/custom/FilterGlobal";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import Loader from "@/components/custom/Loader";

const InstitutionUsersPage = () => {
  const isPending = false;
  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header title="Users and Roles" actions={null} />

          <TableWrapper
            search={<SearchGlobal />}
            filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
            actions={null}
          >
            {isPending ? (
              <Loader />
            ) : (
              // <SpecializationTable data={specializations} />
              <></>
            )}
          </TableWrapper>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionUsersPage;
