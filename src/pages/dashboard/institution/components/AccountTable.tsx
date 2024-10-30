import CustomTable, {
  ColumnSetup,
  CustomCell,
} from "@/components/custom/CustomTable";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SharedActions from "../../requests/components/table-requests/custom/SharedActions";
import CreateAccountDialog from "./CreateAccountDialog";

type AccountTableDataProps = {
  accountTableData: {
    id: number;
    description: string;
    amount: number;
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
  return (
    <>
      <CreateAccountDialog accountDetails={item} action="update" />
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

export default function AccountTable({
  accountTableData,
}: AccountTableDataProps) {
  const [loading, setLoading] = useState(false);
  const [tableArray, setTableArray] = useState(accountTableData);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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
          value={"Description"}
          className="font-bold w-full min-w-[35rem]"
        />
      ),
      accessorKey: "description",
      cell: (info) => (
        <CustomCell value={info.getValue()} className="min-w-[35rem] w-full" />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Amount"}
          className="font-bold min-w-[9rem] w-full"
        />
      ),
      accessorKey: "amount",
      cell: (info) => (
        <CustomCell value={info.getValue()} className="min-w-[9rem] w-full" />
      ),
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
            value={<RenderFunctions item={item} />}
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
