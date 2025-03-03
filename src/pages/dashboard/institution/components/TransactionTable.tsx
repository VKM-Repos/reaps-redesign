import CustomTable, {
  type ColumnSetup,
  CustomCell,
} from "@/components/custom/CustomTable";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SharedActions from "../../requests/components/table-requests/custom/SharedActions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AccountTableDataProps = {
  accountTableData: {
    id: number;
    applicant_name: string;
    submission: string;
    status: string;
    receipt: string;
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

export function RenderFunctions({ item }: any) {
  console.log(item);

  return (
    <>
      <div className="flex items-center gap-4">
        <Button className="bg-[#1B8236]">Approve</Button>
        <Button className="bg-[#A81524]">Decline</Button>
      </div>
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

export default function TransactionTable({
  accountTableData,
}: AccountTableDataProps) {
  const [loading, setLoading] = useState(false);
  const [tableArray, setTableArray] = useState(accountTableData);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const statusColorMap: { [key: string]: { bg: string; text: string } } = {
    Unconfirmed: { bg: "#E5E795", text: "#254D4B" },
    Confirmed: { bg: "#80EF80", text: "#333A33" },
    Declined: { bg: "#E7484847", text: "#BF1E2C" },
  };

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
        <CustomCell value={"Applicant Name"} className="font-bold " />
      ),
      accessorKey: "applicant_name",
      cell: (info) => <CustomCell value={info.getValue()} className="" />,
    },
    {
      header: () => <CustomCell value={"Submission"} className="font-bold " />,
      accessorKey: "submission",
      cell: (info) => <CustomCell value={info.getValue()} className="" />,
    },
    {
      header: () => <CustomCell value={"Status"} className="font-bold" />,
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
              />
              {item}
            </Badge>
          </span>
        );
      },
    },
    {
      header: () => <CustomCell value={"Receipt"} className="font-bold" />,
      accessorKey: "receipt",
      cell: (info) => <CustomCell value={info.getValue()} className="" />,
    },
    {
      accessorKey: "custom",
      header: () => <CustomCell value="" className="w-fit" />,
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
            value={<RenderFunctions item={item} />}
            className="flex justify-center items-center justify-self-end"
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
