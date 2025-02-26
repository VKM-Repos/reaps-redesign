import CustomTable from "@/components/custom/CustomTable";
import columns from "./columns";
import EmptyRequests from "../empty-state";
import type { RequestItems } from "@/types/requests";

type Props = {
  data: RequestItems[];
};

const RequestTable = ({ data }: Props) => {
  console.log(data, "cus");

  return (
    <div className="w-full">
      {data.length > 0 ? (
        <CustomTable data={data} columns={columns} />
      ) : (
        <EmptyRequests />
      )}
    </div>
  );
};

export default RequestTable;
