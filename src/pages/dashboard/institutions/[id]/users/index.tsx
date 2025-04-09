import FilterGlobal from "@/components/custom/FilterGlobal";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import AllUsersTable from "./table";
import { AddUserButton } from "./add-user-button";

const InstitutionUsersPage = () => {
  const { data: users, isPending } = useGET({
    url: "users",
    queryKey: ["GET_USERS_IN_USERS_PAGE"],
  });

  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header title="Users and Roles" actions={<AddUserButton />} />

          <TableWrapper
            search={<SearchGlobal />}
            filter={<FilterGlobal onApplyFilters={() => {}} statuses={[]} />}
            actions={null}
          >
            {isPending ? <Loader /> : <AllUsersTable data={users?.items} />}
          </TableWrapper>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionUsersPage;
