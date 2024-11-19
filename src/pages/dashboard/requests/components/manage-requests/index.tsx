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
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import { Badge } from "@/components/ui/badge";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import View from "@/components/custom/Icons/View";
import InstitutionRequestSummary from "../../view-requests/admin";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SignatureIcon from "@/components/custom/Icons/Signature";
import AssignReviewer from "../AssignReviewer";
import Loader from "@/components/custom/Loader";
import { useState } from "react";

type TableRequestsProps = {
  institutionTableData: {
    title: string;
    applicantName: string;
    submission: string;
    status: string;
  }[];
};

const statusColorMap: { [key: string]: { bg: string; text: string } } = {
  Awaiting: { bg: "#C2BDFF", text: "#13131A" },
  Reviewed: { bg: "#A7DAFF", text: "#0D141A" },
  Assigned: { bg: "#DEFFBD", text: "#161A13" },
  "In Progress": { bg: "#FFA165", text: "#1A1513" },
};

function RenderFunctions({setLoading}: { setLoading: (loading: boolean) => void}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <MoreIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-fit .dropdown-shadow">
        <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
          <>
            <Sheet>
              <SheetTrigger
                className={`text-black flex justify-center items-center gap-2 p-3`}
              >
                <View />
                <span>View</span>
              </SheetTrigger>
              <InstitutionRequestSummary />
            </Sheet>
            <Dialog>
              <DialogTrigger
                className={`text-black flex justify-center items-center gap-2 p-3`}
              >
                <SignatureIcon />
                <span>Reviewers</span>
              </DialogTrigger>
              <AssignReviewer setLoader={setLoading}/>
            </Dialog>
          </>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function ManageRequests({
  institutionTableData,
}: TableRequestsProps) {
  // const [ tableArray, setTableArray ] = useState(institutionTableData);
  const { multiStatusDateFilter } = useGlobalFilter();
  const [loading, setLoading] = useState(false);
  
  const columnData: ColumnSetup<any>[] = [
    {
      header: () => (
        <CustomCell
          value={"Title"}
          className="font-bold w-full min-w-[18.75rem]"
        />
      ),
      accessorKey: "title",
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
          value={"Applicant Name"}
          className="font-bold w-full min-w-[12rem]"
        />
      ),
      accessorKey: "applicantName",
      cell: (info) => (
        <CustomCell value={info.getValue()} className="min-w-[12rem] w-full" />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Submission"}
          className="font-bold w-full min-w-[10rem]"
        />
      ),
      accessorKey: "submission",
      cell: ({ getValue }) => (
        <CustomCell value={getValue()} className="min-w-[10rem] w-full" />
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
          <span className="text-left min-w-[8.75rem] flex justify-left !text-xs">
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
      cell: () => {
        return (
          <CustomCell
            value={<RenderFunctions setLoading={setLoading}/>}
            className="flex justify-center items-center justify-self-end w-full md:max-w-[3rem]"
          />
        );
      },
    },
  ];

  return (
    <>
    {loading && <Loader />}
      <CustomTable columns={columnData} data={institutionTableData} />
    </>
  );
}
