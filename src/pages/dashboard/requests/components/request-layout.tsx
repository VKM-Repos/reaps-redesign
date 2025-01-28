import React from "react";
import PageTitle from "../../../../components/custom/PageTitle";
import { useNavigate } from "react-router-dom";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { Button } from "@/components/ui/button";
import LinkIcon from "@/components/custom/Icons/LinkIcon";
import { Tabs } from "@/components/ui/tab";

type Props = {
  tab_header: React.ReactNode;
  children: React.ReactNode;
  filters: React.ReactNode;
  data?: any;
  setActiveTab: any;
};

const RequestLayout = ({
  tab_header,
  children,
  filters,
  data,
  setActiveTab,
}: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/requests/create");
  };

  return (
    <section className="w-full flex flex-col gap-[5rem] overflow-hidden">
      <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
        <PageTitle title="Requests" />
        {data && data.length > 0 && (
          <Button
            onClick={handleNavigate}
            className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"
          >
            <span>
              <GoogleDoc />
            </span>
            Request Ethical Approval
          </Button>
        )}
      </div>
      <Tabs
        defaultValue="my_request"
        onValueChange={(val) => setActiveTab(val)}
        className="flex flex-col gap-y-[2rem]"
      >
        <div className="">{tab_header}</div>
        <div className="flex items-center justify-between">
          {filters}
          <div className="lg:flex items-center gap-1 hidden">
            <span>
              <a
                href="#"
                className="font-semibold underline text-black hover:text-primary"
              >
                The approval process
              </a>
            </span>
            <span>
              <LinkIcon />
            </span>
          </div>
        </div>

        <div className="">{children}</div>
      </Tabs>
    </section>
  );
};

export default RequestLayout;
