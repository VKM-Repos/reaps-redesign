import CustomTable, {
  ColumnSetup,
  CustomCell,
} from "@/components/custom/CustomTable";
import GoogleDocLarge from "@/components/custom/Icons/GoogleDocLarge";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import { Link } from "react-router-dom";
import { Institution } from "@/types/institutions";
import View from "@/components/custom/Icons/View";
import { Badge } from "@/components/ui/badge";

type Props = {
  data: Institution[];
};
function RenderFunctions({ item }: { item: any }) {
  const institution = item;
  return (
    <>
      <Link
        className="text-black flex items-center gap-2"
        to={`/institutions/${item.id}`}
        state={{ institution }}
      >
        View <View />
      </Link>
    </>
  );
}
const InstitutionTable = ({ data }: Props) => {
  const { multiStatusDateFilter } = useGlobalFilter();

  const columnData: ColumnSetup<any>[] = [
    {
      header: () => (
        <CustomCell
          value={"Name of Institution"}
          className="font-bold w-full min-w-[15rem]"
        />
      ),
      accessorKey: "name",
      cell: (info) => (
        <CustomCell value={info.getValue()} className="min-w-[15rem] w-full" />
      ),
    },

    {
      header: () => (
        <CustomCell
          value={"Email"}
          className="font-bold w-full min-w-[11rem]"
        />
      ),
      accessorKey: "email",
      cell: ({ getValue }) => (
        <CustomCell value={getValue()} className="min-w-[11rem] w-full" />
      ),
      filterFn: multiStatusDateFilter,
      enableGlobalFilter: false,
    },
    {
      header: () => (
        <CustomCell
          value={"Onboarded on"}
          className="font-bold w-full min-w-[8rem]"
        />
      ),
      accessorKey: "joined",
      cell: ({ getValue }) => (
        <CustomCell value={getValue()} className="min-w-[8rem] w-full" />
      ),
    },
    {
      header: () => (
        <CustomCell value={"Status"} className=" w-full min-w-[3rem]" />
      ),
      accessorKey: "status",
      cell: ({ getValue }) => (
        <Badge
          className={`flex items-center justify-center capitalize font-light gap-1 ${
            getValue() == "active"
              ? "bg-[#E5FFE5] text-[#00C000]"
              : "bg-[#FFE5E6] text-[#FF000A]"
          }`}
        >
          <div
            className={`h-1 w-1 ${
              getValue() == "active" ? "bg-[#00C000] " : "bg-[#FF000A] "
            } rounded-full`}
          />{" "}
          {getValue()}
        </Badge>
      ),
    },
    {
      accessorKey: "custom",
      header: () => <CustomCell value="" className="w-full md:max-w-[3rem]" />,
      meta: { cellType: "custom" },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <CustomCell
            value={<RenderFunctions item={item} />}
            className="flex justify-center items-center justify-self-end w-full md:max-w-[3rem]"
          />
        );
      },
    },
  ];
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <CustomTable data={data} columns={columnData} />
      ) : (
        <div className="mx-auto my-0 w-full md:4/5 flex flex-col justify-center items-center mb-10">
          <div className="w-[96px] h-[96px] pl-2 mx-auto mt-[6rem] mb-4 md:mb-[6rem] rounded-full flex justify-center items-center bg-[#FFD13A] ">
            <GoogleDocLarge />
          </div>
          <div className="flex flex-col gap-6 w-full max-w-[37rem] text-center">
            <h1 className="text-[1.625rem] leading-8 font-bold">
              Institution list is empty
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionTable;
