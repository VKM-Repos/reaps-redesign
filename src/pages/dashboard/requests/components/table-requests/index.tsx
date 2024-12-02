import CustomTable, {
  ColumnSetup,
  CustomCell,
} from "@/components/custom/CustomTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import Loader from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SharedActions from "./custom/SharedActions";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import { RequestItems } from "@/types/requests";

type TableRequestsProps = {
  tableData: {
    id: string;
    title: string;
    specialization: string;
    submission: string;
    status: string;
  }[];
};

type RenderFunctionsProps = {
  item: RequestItems;
  onDelete: (item: any) => void;
  loading: boolean;
};

const statusColorMap: { [key: string]: { bg: string; text: string } } = {
  Approved: { bg: "#34A85347", text: "#254D4B" },
  Pending: { bg: "#CDD0CD", text: "#333A33" },
  Declined: { bg: "#E7484847", text: "#BF1E2C" },
  Draft: { bg: "#192C8A1A", text: "#040C21" },
  "Under Review": { bg: "#F2C374", text: "#452609" },
};

function RenderFunctions({ item, onDelete, loading }: RenderFunctionsProps) {
  const { setStep } = useRequestsStore();
  const navigate = useNavigate();

  const redirectToSummary = () => {
    navigate("/requests/edit-request");
    setStep(5);
  };

  return (
    <>
      {loading && <Loader />}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button>
            <MoreIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
          <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
            <SharedActions
              item={item}
              onDelete={onDelete}
              redirectToSummary={redirectToSummary}
            />
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

export default function MyRequestsTable({ tableData }: TableRequestsProps) {
  const [loading, setLoading] = useState(false);
  const [tableArray, setTableArray] = useState(tableData);
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
            value={"Title"}
            className="font-bold w-full min-w-[18.75rem]"
          />
        ),
        accessorKey: "research_title",
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
            value={"Submission"}
            className="font-bold w-full min-w-[11rem]"
          />
        ),
        accessorKey: "submission",
        cell: ({ getValue }) => (
          <CustomCell value={getValue()} className="min-w-[11rem] w-full" />
        ),
        filterFn: multiStatusDateFilter,
        enableGlobalFilter: false,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const item = getValue();
          return (
            <span className="text-left min-w-[8.75rem] flex justify-left !text-xs -font-bold w-full">
              <Badge
                style={{
                  color: statusColorMap[item]?.text || "#000000",
                  backgroundColor: statusColorMap[item]?.bg || "#192C8A",
                }}
                className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem]"
              >
                <div
                  style={{
                    backgroundColor: statusColorMap[item]?.text || "#192C8A",
                  }}
                  className="w-[5px] h-[5px] rounded-full"
                ></div>
                {item}
              </Badge>
            </span>
          );
        },
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
              value={
                <RenderFunctions
                  item={item}
                  onDelete={deleteTableItem}
                  loading={loading}
                />
              }
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
