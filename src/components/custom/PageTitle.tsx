type Props = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export default function PageTitle({ title, actions, description }: Props) {
  return (
    <>
      <div className="flex md:flex-row flex-col gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
        <h1 className="text-[1.875rem] font-bold">{title}</h1>
        {actions}
      </div>
      <p className="text-sm text-[#454745]">{description}</p>
    </>
  );
}
