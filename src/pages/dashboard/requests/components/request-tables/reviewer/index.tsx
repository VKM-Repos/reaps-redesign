import CustomTable from "@/components/custom/CustomTable";
import columns from "./columns";
import { RequestItems } from "@/types/requests";
import EmptyRequests from "../../empty-state";

type Props = {
  data: RequestItems[];
};

const ReviewerRequestTable = ({ data }: Props) => {
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

export default ReviewerRequestTable;
