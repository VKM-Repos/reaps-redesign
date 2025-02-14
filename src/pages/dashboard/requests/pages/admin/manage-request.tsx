/* eslint-disable @typescript-eslint/no-explicit-any */
import PageTitle from "../../../../../components/custom/PageTitle";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import TableWrapper from "@/components/custom/TableWrapper";
import SearchGlobal from "@/components/custom/SearchGlobal";
import FilterGlobal from "@/components/custom/FilterGlobal";
import { TransitionElement } from "@/lib/transitions";
import { useEffect, useState } from "react";
import ManageRequestTable from "../../components/request-tables/admin";
import { RequestItems } from "@/types/requests";

export default function ManageRequestPage() {
  const statusUrls: any = {
    all: `approved-requests`,
    new: `approved-requests?sort_direction=asc&skip=0&limit=100&status=New`,
    approved: `approved-requests?sort_direction=asc&skip=0&limit=100&status=Approved`,
    reopened: `approved-requests?sort_direction=asc&skip=0&limit=100&status=Re Opened`,
    declined: `approved-requests?sort_direction=asc&skip=0&limit=100&status=Declined`,
    review_in_progress: `approved-requests?sort_direction=asc&skip=0&limit=100&status=Review in Progress`,
    // add more fields to filter
  };

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { data, isPending, refetch } = useGET({
    url: statusUrls[selectedStatus],
    queryKey: ["FETCH_REQUESTS", selectedStatus],
    enabled: !!statusUrls[selectedStatus],
  });

  const applyFilters = (filters: { statuses: string[] }) => {
    if (filters.statuses.length > 0) {
      const formattedStatus = filters.statuses[0]
        .toLowerCase()
        .replace(/\s+/g, "_");

      const newStatus = Object.keys(statusUrls).find(
        (key) => key === formattedStatus
      );

      if (newStatus) setSelectedStatus(newStatus);
    }
  };

  const handleFunc = () => {
    navigate("/requests/create");
  };

  useEffect(() => {
    refetch();
  }, []);

  const transformItems = (items: any): RequestItems[] | any => {
    if (!Array.isArray(items)) return [];

    return items.map((item: any) => ({
      id: item?.id,
      research_title: item?.request?.research_title,
      fullName: `${item?.request?.user?.first_name} ${item?.request?.user?.last_name}`,
      email: item?.request?.user?.email,
      created_at: item?.request?.created_at,
      status: item?.request?.status,
      all: item?.request,
    }));
  };

  const tableData = transformItems(data);

  return (
    <TransitionElement>
      <div className="space-y-12">
        <PageTitle
          title="Manage Request"
          actions={
            <Button
              onClick={handleFunc}
              className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"
            >
              <span>
                <GoogleDoc />
              </span>
              Request Ethical Approval
            </Button>
          }
        />

        <TableWrapper
          search={<SearchGlobal />}
          filter={
            <FilterGlobal
              statuses={Object.keys(statusUrls).map((key) =>
                key.replace(/_/g, " ").toLowerCase()
              )}
              onApplyFilters={applyFilters}
            />
          }
          actions={
            <div className="lg:flex items-center gap-1 hidden">
              <span>
                <a href="" className="font-semibold underline text-black">
                  The approval process
                </a>
              </span>
              <span>
                <LinkIcon />
              </span>
            </div>
          }
        >
          {isPending ? <Loader /> : <ManageRequestTable data={tableData} />}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
}
