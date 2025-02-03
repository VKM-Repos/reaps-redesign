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
import RequestTable from "../../components/request-tables";
import { TransitionElement } from "@/lib/transitions";
import { useEffect, useState } from "react";

export default function MyRequest() {
  const statusUrls: any = {
    all: `requests/users/me`,
    submitted: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Submitted`,
    not_submitted_yet: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Not Submitted Yet`,
    under_review: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Review in Progress`,
    reopened: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Re Opened`,
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
      const newStatus = Object.keys(statusUrls).find(
        (key) => key === filters.statuses[0].toLowerCase().replace(" ", "_")
      );
      if (newStatus) setSelectedStatus(newStatus);
    }
  };

  const handleFunc = () => {
    navigate("/requests/create");
  };

  useEffect(() => {
    refetch();
  }, [selectedStatus]);

  return (
    <TransitionElement>
      <div className="space-y-12">
        <PageTitle
          title="My Requests"
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
              statuses={Object.keys(statusUrls).map((status) =>
                status.replace(/_/g, " ")
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
          {isPending ? <Loader /> : <RequestTable data={data ?? []} />}
        </TableWrapper>
      </div>
    </TransitionElement>
  );
}
