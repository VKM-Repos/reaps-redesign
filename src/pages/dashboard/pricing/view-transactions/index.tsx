import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import { useNavigate } from "react-router-dom";
import TransactionTable from "./transaction-table";

export default function ViewTransactions() {
  const navigate = useNavigate();

  const handleFunc = () => {
    navigate("/pricing");
  };

  return (
    <>
      <div className="flex flex-col gap-[1.25rem]">
        <div className="flex flex-col gap-[1.25rem] mx-auto w-full">
          <div className="flex gap-3 items-center">
            <div
              onClick={handleFunc}
              title="Go back"
              className="p-4 rounded-full bg-[#14155E14] rotate-180 cursor-pointer"
            >
              <ArrowLeft />
            </div>
            <h1 className="text-[1.875rem] font-bold">Your transactions</h1>
          </div>
          <p className="text-sm text-[#454745]">
            Here you can see the details of all the payments you have made,
            please note that you will only find the transaction history of only
            payments made online and not offline
          </p>
        </div>
        <div className="mx-auto my-0 flex w-full flex-col items-center justify-center">
          <TransactionTable />
        </div>
      </div>
    </>
  );
}
