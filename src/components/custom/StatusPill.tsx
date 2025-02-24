import { statusColorMap } from "@/lib/utils";
import { Badge } from "../ui/badge";

type Props = {
  status: string;
};

const formatStatus = (status: string) => {
  return status
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const StatusPill = ({ status }: Props) => {
  const formattedStatus = formatStatus(status);

  return (
    <Badge
      style={{
        color: statusColorMap[formattedStatus]?.text || "#000000",
        backgroundColor: statusColorMap[formattedStatus]?.bg || "#192C8A",
      }}
      className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] whitespace-nowrap font-normal text-[12px]"
    >
      <div
        style={{
          backgroundColor: statusColorMap[formattedStatus]?.text || "#000000",
        }}
        className="w-[5px] h-[5px] rounded-full"
      ></div>
      {formattedStatus}
    </Badge>
  );
};

export default StatusPill;
