import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import InstitutionPaymentsTable from "./table";
import PageTitle from "@/components/custom/PageTitle";

const InstitutionPayments = () => {

  return (
    <section>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle title="Payments" actions={null} />
        <TableWrapper
          search={<SearchGlobal />}
          actions={null}
        >
            <InstitutionPaymentsTable />
        </TableWrapper>
      </div>
    </section>
  );
};

export default InstitutionPayments;
