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
// import { Badge } from "@/components/ui/badge";
// import { useGlobalFilter } from "@/context/GlobalFilterContext";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import View from "@/components/custom/Icons/View";
import InstitutionRequestSummary from "../../view-requests/admin";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SignatureIcon from "@/components/custom/Icons/Signature";
import ReviewersList from "./reviewers-list";
import { statusColorMap, truncateString } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type TableRequestsProps = {
  institutionTableData: {
    title: string;
    applicantName: string;
    submission: string;
    status: string;
  }[];
};

// const statusColorMap: { [key: string]: { bg: string; text: string } } = {
//   Awaiting: { bg: "#C2BDFF", text: "#13131A" },
//   Reviewed: { bg: "#A7DAFF", text: "#0D141A" },
//   Assigned: { bg: "#DEFFBD", text: "#161A13" },
//   "In Progress": { bg: "#FFA165", text: "#1A1513" },
// };

function RenderFunctions({ item }: { item: any }) {
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
              <InstitutionRequestSummary request={item} />
            </Sheet>
            <Dialog>
              <DialogTrigger
                className={`text-black flex justify-center items-center gap-2 p-3`}
              >
                <SignatureIcon />
                <span>Reviewers</span>
              </DialogTrigger>
              <ReviewersList request_id={item.id} />
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
  // const { multiStatusDateFilter } = useGlobalFilter();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const columnData: ColumnSetup<any>[] = [
    {
      header: () => (
        <CustomCell
          value={"Title"}
          className="font-bold w-full min-w-[10rem]"
        />
      ),
      accessorKey: "research_title",
      cell: (info) => (
        <CustomCell value={info.getValue()} className="min-w-[10rem] w-full" />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Applicant Name"}
          className="font-bold w-full min-w-[8rem]"
        />
      ),
      accessorKey: "user.first_name",
      cell: (info) => {
        const applicant_name =
          info.row.original.user.first_name +
          " " +
          info.row.original.user.last_name;
        return (
          <CustomCell
            value={applicant_name}
            className=" w-full  min-w-[8rem]"
          />
        );
      },
    },
    {
      header: () => (
        <CustomCell value={"Email"} className="font-bold w-full min-w-[8rem]" />
      ),
      accessorKey: "user.email",
      cell: ({ getValue }) => (
        <CustomCell
          className="w-full min-w-[8rem] text-left"
          value={truncateString(getValue(), 15)}
        />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Status"}
          className="font-bold w-full min-w-[8.75rem]"
        />
      ),
      accessorKey: "status",
      cell: ({ getValue }) => (
        <span className="text-left min-w-[8.75rem] flex justify-left !text-xs">
          <Badge
            style={{
              color: statusColorMap[getValue()]?.text || "#000000",
              backgroundColor: statusColorMap[getValue()]?.bg || "#192C8A",
            }}
            className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem]"
          >
            <div
              style={{
                backgroundColor: statusColorMap[getValue()]?.text || "#192C8A",
              }}
              className="w-[5px] h-[5px] rounded-full"
            ></div>
            {getValue()}
          </Badge>
        </span>
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Submission"}
          className="font-bold w-full min-w-[12rem]"
        />
      ),
      accessorKey: "created_at",
      cell: ({ getValue }) => (
        <CustomCell
          className="w-full max-w-[12rem]"
          value={formatDate(getValue())}
        />
      ),
    },
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   cell: ({ getValue }) => {
    //     const item = getValue();
    //     return (
    //       <span className="text-left min-w-[8.75rem] flex justify-left !text-xs">
    //         <Badge
    //           style={{
    //             color: statusColorMap[item]?.text || "#000000",
    //             backgroundColor: statusColorMap[item]?.bg || "#192C8A",
    //           }}
    //           className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem]"
    //         >
    //           <div
    //             style={{
    //               backgroundColor: statusColorMap[item]?.text || "#192C8A",
    //             }}
    //             className="w-[5px] h-[5px] rounded-full"
    //           ></div>
    //           {item}
    //         </Badge>
    //       </span>
    //     );
    //   },
    //   filterFn: multiStatusDateFilter,
    //   enableGlobalFilter: false,
    // },
    {
      accessorKey: "custom",
      header: () => <CustomCell value="" className="w-full md:max-w-[1rem]" />,
      meta: { cellType: "custom" },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <CustomCell
            value={<RenderFunctions item={item} />}
            className="flex justify-center items-center justify-self-end w-full md:max-w-[1rem]"
          />
        );
      },
    },
  ];

  return (
    <>
      <CustomTable columns={columnData} data={institutionTableData} />
    </>
  );
}
