import Puzzle from "../../../../../components/custom/Icons/Puzzle";

type Props = {
  children: React.ReactNode;
};

export default function EmptyState({ children }: Props) {
  return (
    <div className="mx-auto w-fit">
      <div className="mx-auto my-[6rem] flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#FFD13A] pl-2 ">
        <Puzzle />
      </div>
      <div className="flex w-full max-w-[37rem] flex-col gap-8 text-center">
        <h1 className="text-[1.625rem] font-bold leading-8">
          Upload and manage research templates
        </h1>
        <p>You can upload templates for your institution.</p>

        <div className="mx-auto w-fit">{children}</div>
      </div>
    </div>
  );
}
