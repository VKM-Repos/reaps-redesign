import CustomTable, {
  ColumnSetup,
  CustomCell,
} from "@/components/custom/CustomTable";
import SearchIcon from "@/components/custom/Icons/Search";
import Loader from "@/components/custom/Loader";
import { DialogContent } from "@/components/ui/dialog";
import { useGET } from "@/hooks/useGET.hook";
import { useState } from "react";
import { ReviewersList } from "./ReviewersList";
import { useDELETE } from "@/hooks/useDelete.hook";
import { toast } from "@/components/ui/use-toast";

export default function AssignReviewer({ request }: { request: any }) {
  const {
    data: assigned,
    isPending: fetching_assigned,
    refetch: refetch_assigned,
  } = useGET({
    url: `reviews/request/${request?.id}`,
    queryKey: ["GET_ASSIGNED_IN_ASSIGN_REVIEW_PAGE"],
  });

  const { mutate: un_assign, isPending: un_assigning } =
    useDELETE("reviews/unassign");
  function un_assign_review(request_id: string, reviewer_id: string) {
    un_assign(
      { request_id, reviewer_id },
      {
        onSuccess: (response: any) => {
          refetch_assigned();
          toast({
            title: "Feedback",
            description: response.data.message,
            variant: "default",
          });
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.response.data.detail,
            variant: "destructive",
          });
        },
      }
    );
  }

  const columnData: ColumnSetup<any>[] = [
    {
      header: () => (
        <CustomCell
          value={"First Name"}
          className="w-full min-w-[15rem] font-semibold text-[#0C0D0F]"
        />
      ),
      accessorKey: "reviewer.first_name",
      cell: (info) => (
        <CustomCell
          value={info.getValue()}
          className="w-full min-w-[15rem] text-black"
        />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Last Name"}
          className="w-full min-w-[15rem] font-semibold text-[#0C0D0F]"
        />
      ),
      accessorKey: "reviewer.last_name",
      cell: (info) => (
        <CustomCell
          value={info.getValue()}
          className="w-full min-w-[15rem] text-black"
        />
      ),
    },
    {
      header: () => (
        <CustomCell
          value={"Status"}
          className="w-full min-w-[15rem] font-semibold text-[#0C0D0F]"
        />
      ),
      accessorKey: "status",
      cell: (info) => (
        <CustomCell
          value={info.getValue()}
          className="w-full min-w-[15rem] text-black"
        />
      ),
    },

    {
      accessorKey: "custom",
      header: () => (
        <CustomCell
          value={"Action"}
          className="w-full md:max-w-[3rem] flex items-start"
        />
      ),
      meta: { cellType: "custom" },
      cell: ({ row }) => {
        const item = row.original;

        return (
          <button
            className={`
                bg-primary text-white
             py-3 px-6 font-semibold rounded-[0.5rem] max-w-fit`}
            onClick={() => un_assign_review(item.request.id, item.reviewer.id)}
          >
            Un-assign
          </button>
        );
      },
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {fetching_assigned || un_assigning ? (
        <Loader />
      ) : (
        <DialogContent className="fixed !w-full !max-w-[70rem] h-[90%] mx-auto">
          <div className="w-full mt-[5.5rem] px-[3.5rem] overflow-y-scroll">
            <div className="flex flex-col justify-start gap-[1.875rem] mx-auto">
              <div className="flex flex-col justify-start gap-[1.875rem] bg-white z-[99] w-full mx-auto">
                <h1 className="font-semibold text-[1.875rem]">
                  Assign Reviewer
                </h1>
                <div className="flex justify-between w-full">
                  <div className="flex py-3 px-4 gap-2 border border-[#0E0F0C1F] rounded-[0.625rem] w-full min-w-[13rem] md:min-w-[21rem] max-w-[21rem]">
                    <SearchIcon />
                    <input
                      name="search"
                      placeholder="Search"
                      type="search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="border-none hover:border-none focus:border-none w-full focus-visible:outline-none text-sm"
                    />
                  </div>
                  <ReviewersList refetch={refetch_assigned} request={request} />
                  {/* <DialogClose disabled={numOfReviewers < 1}>
                                {/* assign at least one reviewer before close 
                                <Button variant={numOfReviewers < 1 ? "ghost" : "default"} className="!py-3 !px-6 font-semibold rounded-[0.5rem] w-full max-w-[9.375rem]">Finish</Button>
                            </DialogClose>  */}
                </div>
              </div>
              <h1 className="font-semibold text-[1.2rem]">
                Reviewers for{" "}
                <span className="text-primary">
                  ({request?.research_title})
                </span>
              </h1>
              <div className="w-full max-w-[95%] ">
                <CustomTable
                  columns={columnData}
                  data={assigned?.items || []}
                  localSearch={searchTerm}
                  setLocalSearch={setSearchTerm}
                  customTableClassName="p-5 w-full"
                  customHeaderRowClassName="bg-[#14155E14] border-b-[#0E0F0C1F] !my-3 !py-2 !px-6 rounded-[.625rem]"
                  customRowClassName="!border-b-[#0E0F0C1F] !border !border-b !my-3 !px-6 !py-0 hover:bg-[#14155E14] !rounded-[.625rem]"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </>
  );
}
