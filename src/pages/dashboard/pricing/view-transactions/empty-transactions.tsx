import Puzzle from "../../../../components/custom/Icons/Puzzle";

export default function EmptyTransactions() {
  return (
    <div className="mx-auto w-fit">
      <div className="mx-auto my-[6rem] flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#FFD13A] pl-2 ">
        <Puzzle />
      </div>
      <div className="flex w-full max-w-[37rem] flex-col gap-8 text-center">
        <h1 className="text-[1.625rem] font-bold leading-8">No Transactions</h1>
        <p>no transactions</p>
      </div>
    </div>
  );
}
