import CustomTable, {
  ColumnSetup,
  CustomCell,
} from "@/components/custom/CustomTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import ArrowUp from "@/components/custom/Icons/ArrowUp";
import ArrowDown from "@/components/custom/Icons/ArrowDown";
import { UserGradeDialog } from "./UserGradeDialog";
import { Check } from "lucide-react";
import Cancel from "@/components/custom/Icons/Cancel";

// type usersTableDataProps = {
//   usersTableData: {
//     id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     user_type: string;
//   } | any[];
// };

// type RenderFunctionsProps = {
//   item: {
//     title: string;
//     specialization: string;
//     submission: string;
//     status: string;
//   };
//   onDelete: (item: any) => void;
//   loading: boolean;
// };

function RenderFunctions({
  item,
  refetch,
}: {
  item: any;
  refetch: () => void;
}) {
  console.log(item, "????? item");

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button>
            <MoreIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl rounded-r-none py-2 px-4 w-fit .dropdown-shadow">
          <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ArrowUp />
              <UserGradeDialog refetch={refetch} user={item} title="Upgrade" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ArrowDown />
              <UserGradeDialog
                refetch={refetch}
                user={item}
                title="Downgrade"
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 cursor-pointer"
            >
              {item?.enable ? <Cancel /> : <Check />}
              <UserGradeDialog
                refetch={refetch}
                user={item}
                title={item?.enable ? "De-activate" : "Activate"}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 cursor-pointer"
            >
              {/* <UserGradeDialog
                refetch={refetch}
                user={item}
                title="De-activate"
              /> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default function ResearchersTable({
  usersTableData,
  refetch,
}: {
  usersTableData: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
  }[];
  refetch: () => void;
}) {
  const { multiStatusDateFilter } = useGlobalFilter();
  const columnData: ColumnSetup<any>[] = [
    {
      header: () => (
        <CustomCell
          value={"First Name"}
          className="font-bold w-full min-w-[18.75rem]"
        />
      ),
      accessorKey: "first_name",
      cell: (info) => (
        <CustomCell
          value={info.getValue()}
          className="min-w-[18.75rem] w-full"
        />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Last Name"}
          className="font-bold min-w-[9rem] w-full"
        />
      ),
      accessorKey: "last_name",
      cell: (info) => (
        <CustomCell value={info.getValue()} className="min-w-[9rem] w-full" />
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
      accessorKey: "custom",
      header: () => <CustomCell value="" className="w-full md:max-w-[3rem]" />,
      meta: { cellType: "custom" },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <CustomCell
            value={<RenderFunctions refetch={refetch} item={item} />}
            className="flex justify-center items-center justify-self-end w-full md:max-w-[3rem]"
          />
        );
      },
    },
  ];

  return (
    <>
      <CustomTable columns={columnData} data={usersTableData} />
    </>
  );
}
