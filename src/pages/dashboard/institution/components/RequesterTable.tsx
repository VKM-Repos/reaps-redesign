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
import { useState } from "react";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import Loader from "@/components/custom/Loader";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import SharedActions from "../../requests/components/table-requests/custom/SharedActions";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import ArrowUp from "@/components/custom/Icons/ArrowUp";
import ArrowDown from "@/components/custom/Icons/ArrowDown";

type usersTableDataProps = {
  usersTableData: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }[];
};

type RenderFunctionsProps = {
  item: {
    title: string;
    specialization: string;
    submission: string;
    status: string;
  };
  onDelete: (item: any) => void;
  loading: boolean;
};

function RenderFunctions() {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button>
            <MoreIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl rounded-r-none p-2 w-full max-w-24 .dropdown-shadow">
          <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <ArrowUp />
              <span>Upgrade</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <ArrowDown />
              <span>Downgrade</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
function MobileRender({ item, onDelete, loading }: RenderFunctionsProps) {
  const { setStep } = useRequestsStore();
  const navigate = useNavigate();

  const redirectToSummary = () => {
    navigate("/requests/create");
    setStep(5);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex gap-2 justify-center items-center">
        <SharedActions
          item={item}
          onDelete={onDelete}
          redirectToSummary={redirectToSummary}
          isMobile
        />
      </div>
    </>
  );
}

export default function RequesterTable({
  usersTableData,
}: usersTableDataProps) {
  const [loading, setLoading] = useState(false);
  const [tableArray, setTableArray] = useState(usersTableData);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { multiStatusDateFilter } = useGlobalFilter();

  function deleteTableItem(item: any) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setTableArray((prevTableArray) =>
      prevTableArray.filter((data) => data.id !== item.id)
    );
  }

  const columnData: ColumnSetup<any>[] = [
    {
      header: () => (
        <CustomCell
          value={"First Name"}
          className="font-bold w-full min-w-[18.75rem]"
        />
      ),
      accessorKey: "firstName",
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
      accessorKey: "lastName",
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
        return isMobile ? (
          <CustomCell
            value={
              <MobileRender
                item={item}
                onDelete={deleteTableItem}
                loading={loading}
              />
            }
            className="flex justify-center items-center w-full md:max-w-[3rem]"
          />
        ) : (
          <CustomCell
            value={<RenderFunctions />}
            className="flex justify-center items-center justify-self-end w-full md:max-w-[3rem]"
          />
        );
      },
    },
  ];

  return (
    <>
      <CustomTable columns={columnData} data={tableArray} />
    </>
  );
}
