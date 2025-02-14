import PageTitle from "@/components/custom/PageTitle";
import SearchGlobal from "@/components/custom/SearchGlobal";
import TableWrapper from "@/components/custom/TableWrapper";
import { TransitionElement } from "@/lib/transitions";
import { Loader } from "lucide-react";
import InstitutionTable from "./components/table/institution-list-table";
import { AddInstitutionButton } from "./components/table/add-institution-button";
import { useGET } from "@/hooks/useGET.hook";

const Institutions = () => {
  const loading = false;
  const { data: institutions, refetch } = useGET({
    url: "institutions",
    queryKey: ["GET-INSTITUTIONS"],
  });
  const institutionsData = [
    {
      id: 1,
      name: "University of Abuja",
      email: "admin@example.com",
      joined: "19-01-1015",
      status: "active",
      phoneNumber: "+2348011234567",
    },
    {
      id: 2,
      name: "University of Lagos",
      email: "info@unilag.edu.ng",
      joined: "22-03-1962",
      status: "active",
      phoneNumber: "+2348022234567",
    },
    {
      id: 3,
      name: "Ahmadu Bello University",
      email: "contact@abu.edu.ng",
      joined: "04-10-1962",
      status: "active",
      phoneNumber: "+2348033234567",
    },
    {
      id: 4,
      name: "University of Ibadan",
      email: "support@ui.edu.ng",
      joined: "17-11-1948",
      status: "Inactive",
      phoneNumber: "+2348044234567",
    },
    {
      id: 5,
      name: "Obafemi Awolowo University",
      email: "info@oauife.edu.ng",
      joined: "08-06-1962",
      status: "active",
      phoneNumber: "+2348055234567",
    },
    {
      id: 6,
      name: "University of Nigeria, Nsukka",
      email: "info@unn.edu.ng",
      joined: "07-10-1960",
      status: "active",
      phoneNumber: "+2348066234567",
    },
    {
      id: 7,
      name: "Covenant University",
      email: "contact@covenantuniversity.edu.ng",
      joined: "21-10-2002",
      status: "active",
      phoneNumber: "+2348077234567",
    },
    {
      id: 8,
      name: "Federal University of Technology, Minna",
      email: "info@futminna.edu.ng",
      joined: "01-02-1983",
      status: "active",
      phoneNumber: "+2348088234567",
    },
  ];
  console.log(institutions);

  return (
    <TransitionElement>
      <div className="flex flex-col gap-[1.25rem]">
        <PageTitle
          title="Institutions"
          actions={<AddInstitutionButton refetch={refetch} />}
        />
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center"></div>
        <TableWrapper search={<SearchGlobal />} filter={null} actions={null}>
          {loading ? (
            <Loader />
          ) : (
            <InstitutionTable data={institutionsData || []} />
          )}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
};

export default Institutions;
