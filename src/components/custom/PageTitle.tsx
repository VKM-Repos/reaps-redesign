type Props = {
  title: string;
  actions?: React.ReactNode;
};

export default function PageTitle({ title, actions }: Props) {
  return (
    <div className="flex md:flex-row flex-col gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
      <h1 className="text-[1.875rem] font-bold">{title}</h1>
      {actions}
    </div>
  );
}
