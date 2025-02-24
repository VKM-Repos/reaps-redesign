import CustomTable from "@/components/custom/CustomTable";
import columns from "./columns";
import { RequestItems } from "@/types/requests";
import GoogleDocLarge from "@/components/custom/Icons/GoogleDocLarge";

type Props = {
  data: RequestItems[];
};

const ManageRequestTable = ({ data }: Props) => {
  console.log(data, "<<<<<");

  return (
    <div className="w-full">
      {data?.length > 0 ? (
        <CustomTable data={data} columns={columns} />
      ) : (
        <div className="mx-auto my-0 w-full md:4/5 flex flex-col justify-center items-center mb-10">
          <div className="w-[96px] h-[96px] pl-2 mx-auto mt-[6rem] mb-4 md:mb-[6rem] rounded-full flex justify-center items-center bg-[#FFD13A] ">
            <GoogleDocLarge />
          </div>
          <div className="flex flex-col gap-6 w-full max-w-[37rem] text-center">
            <h1 className="text-[1.625rem] leading-8 font-bold">
              Research ethics approval made easy
            </h1>
            <p>You have no requests yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequestTable;
