import CustomTable from "@/components/custom/CustomTable";
import columns from "./columns";
import EmptyRequests from "../empty-state";
import { RequestItems } from "@/types/requests";

type Props = {
  data: RequestItems[];
};

const RequestTable = ({ data }: Props) => {
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
