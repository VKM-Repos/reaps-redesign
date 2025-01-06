import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import ResearcherHomePage from "../researcher";
import InstitutionCardBg from "/img/InstitutionCardBg.png";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import FileView from "@/components/custom/Icons/FileView";
import RepeatIcon from "@/components/custom/Icons/Repeat";
import SignatureIcon from "@/components/custom/Icons/Signature";
import MoneyIcon from "@/components/custom/Icons/Money";
import FileRemove from "@/components/custom/Icons/FileRemove";
import { useEffect, useState } from "react";
import CustomChart from "@/components/custom/CustomChart";
import { ChartConfig } from "@/components/ui/chart";
import { RequestsTotal } from "@/types/requests";
import { useGET } from "@/hooks/useGET.hook";

export default function InstitutionAdminHome({ submitted, approved, pending }: RequestsTotal) {
  const [activeStatsTab, setActiveStatsTab] = useState("yourStats");

  return (
    <>
      <Tabs
        defaultValue="yourStats"
        onValueChange={(val) => setActiveStatsTab(val)}
      >
        <TabsList className="flex items-start gap-3">
          <TabsTrigger
            value="yourStats"
            className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${
              activeStatsTab === "yourStats" && "bg-[#FFD13A]"
            }`}
          >
            Your stats
          </TabsTrigger>
          <TabsTrigger
            value="adminStats"
            className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${
              activeStatsTab === "adminStats" && "bg-[#FFD13A]"
            }`}
          >
            Admin stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yourStats">
          <ResearcherHomePage submitted={submitted} approved={approved} pending={pending}/>
        </TabsContent>
        <TabsContent value="adminStats">
          <InstitutionAdminHomePage />
        </TabsContent>
      </Tabs>
    </>
  );
}

const InstitutionAdminHomePage = () => {
  const [activeTab, setActiveTab] = useState("allTime");

  const chartConfig = {
    requests: {
      label: "Requests:",
      color: "#312C33",
    },
  } satisfies ChartConfig;

  const chartData = [
    { month: "Aug 01", requests: 4 },
    { month: "Aug 15", requests: 6 },
    { month: "Aug 30", requests: 7 },
    { month: "Sep 01", requests: 5 },
    { month: "Sep 15", requests: 9 },
    { month: "Sep 30", requests: 10 },
    { month: "Oct 01", requests: 6 },
    { month: "Oct 15", requests: 8 },
    { month: "Oct 31", requests: 5 },
    { month: "Nov 01", requests: 5 },
    { month: "Nov 15", requests: 8 },
    { month: "Nov 25", requests: 10 },
  ];

  const xAxis = {
    dataKey: "month",
    tickLine: false,
    axisLine: false,
    tickMargin: 8,
    interval: 0,
    tick: {
      fill: "#312C33",
      fontWeight: "700",
      fontSize: 14,
      fontFamily: "system-ui",
      letterSpacing: "2.25%",
    },
    tickFormatter: (value: any) => {
      const day = value.split(" ")[1];
      return day === "30" || day === "31" ? value : "";
    },
    padding: { left: 20, right: 20 },
  };

  const yAxis = {
    tickLine: false,
    axisLine: false,
    tick: {
      fill: "#312C33",
      fontWeight: "700",
      fontSize: 16,
      fontFamily: "system-ui",
      letterSpacing: "4.25%",
    },
    tickMargin: 8,
    tickFormatter: (value: any) => value.toFixed(2),
    domain: [0, 10],
    tickCount: 7,
  };

  const tooltipFormatter = (value: any, name: any) => {
    return [`${value}  `, `${name}`];
  };


  const fetchUrls: Record<string, string> = {
    reopened: `requests?sort_by=status&sort_direction=asc&skip=0&limit=100&status=Re Opened'`,
    approved_requests: `approved-requests`,
    pending: `transactions`,
    submitted: `requests?sort_by=status&sort_direction=asc&skip=0&limit=100&status=Submitted`,
    requests_to_reviews: `reviews/reviewer`,
    declined: `requests?sort_by=status&sort_direction=asc&skip=0&limit=100&status=Declined`,
    unconfirmed: `requests?sort_by=status&sort_direction=asc&skip=0&limit=100&status=Awaiting Payment Confirmation`
  };

  const { data: reopened, refetch: refetch_reopened } = useGET({
    url: fetchUrls.reopened,
    queryKey: ["FETCH_REOPENED_REQUESTS"],
    enabled: !!fetchUrls.reopened,
  });

  const { data: reviews, refetch: refetch_reviews } = useGET({
    url: fetchUrls.requests_to_review,
    queryKey: ["FETCH_REQUESTS_TO_REVIEW"],
    enabled: !!fetchUrls.reviews,
  });
  const { data: submitted, refetch: refetch_submitted } = useGET({
    url: fetchUrls.submitted,
    queryKey: ["FETCH_SUBMITTED"],
    enabled: !!fetchUrls.submitted,
  });

  const { data: approved_requests, refetch: refetch_approved } = useGET({
    url: fetchUrls.approved_requests,
    queryKey: ["FETCH_APPROVED_REQUESTS"],
    enabled: !!fetchUrls.approved_requests
  }
  )

  const { data: unconfirmed, refetch: refetch_unconfirmed } = useGET({
    url: fetchUrls.unconfirmed,
    queryKey: ["FETCH_UNCONFIRMED"],
    enabled: !!fetchUrls.unconfirmed
  })

  const { data: declined, refetch: refetch_declined } = useGET({
    url: fetchUrls.declined,
    queryKey: ["FETCH_DECLINED"],
    enabled: !!fetchUrls.declined
  })

  useEffect(() => {
    refetch_approved();
    refetch_declined();
    refetch_reopened();
    refetch_reviews();
    refetch_submitted();
    refetch_unconfirmed();
  }, []);




  return (
    <div className="flex flex-col gap-10 mt-[3.25rem] mb-[14rem]">
      <div className="grid md:grid-cols-4 gap-3 my-8">
        <div className="gap-4 flex items-center md:flex-col w-full">
          <span className="max-h-[8.75rem] w-full">
            <InstitutionCards
              icon={GoogleDoc()}
              label="Submitted Requests"
              num={submitted?.items.length ?? 0}
              color="#7D462A"
            />
          </span>

          <span className="max-h-[8.75rem] w-full">
            <InstitutionCards
              icon={FileView()}
              label="Review Requests"
              num={reviews?.items.length ?? 0}
              color="#891D1D"
            />
          </span>
        </div>
        <div className="">
          <InstitutionCards
            icon={RepeatIcon()}
            label="Re-opened Requests"
            num={reopened?.items.length ?? 0}
            color="#56163B"
            image={InstitutionCardBg}
          />
        </div>
        <div>
          <InstitutionCards
            icon={SignatureIcon()}
            label="Approved Requests"
            num={approved_requests?.items.length}
            color="#0D304A"
            image={InstitutionCardBg}
          />
        </div>
        <div className="gap-4 flex items-center md:flex-col">
          <span className="max-h-[8.75rem] w-full">
            <InstitutionCards
              icon={MoneyIcon()}
              label="Unconfirmed Payments"
              num={unconfirmed?.items.length ?? 0}
              color="#0D304A"
            />
          </span>
          <span className="max-h-[8.75rem] w-full">
            <InstitutionCards
              icon={FileRemove()}
              label="Declined Requests"
              num={declined?.items.length ?? 0}
              color="#55336A"
            />
          </span>
        </div>
      </div>
      <div className=" ">
        <Tabs
          defaultValue="allTime"
          onValueChange={(val) => setActiveTab(val)}
          className="flex flex-col gap-[3.25rem]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
            <h1 className="text-[1.375rem] font-bold">
              Request Submission Overview
            </h1>

            <TabsList className="flex flex-row items-start gap-3">
              <TabsTrigger
                value="allTime"
                className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${
                  activeTab === "allTime" && "bg-[#FFD13A]"
                }`}
              >
                All Time
              </TabsTrigger>
              <TabsTrigger
                value="thisMonth"
                className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${
                  activeTab === "thisMonth" && "bg-[#FFD13A]"
                }`}
              >
                This Month
              </TabsTrigger>
              <TabsTrigger
                value="oneWeek"
                className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${
                  activeTab === "oneWeek" && "bg-[#FFD13A]"
                }`}
              >
                Last 7 days
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="">
            <TabsContent value="allTime">
              <div className={`h-full max-h-[400px]`}>
                <CustomChart
                  chartConfig={chartConfig}
                  chartData={chartData}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  tooltipFormatter={tooltipFormatter}
                />
              </div>
            </TabsContent>
            <TabsContent value="thisMonth">
              <div className={` h-full max-h-[400px]`}>
                <CustomChart
                  chartConfig={chartConfig}
                  chartData={chartData}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  tooltipFormatter={tooltipFormatter}
                />
              </div>
            </TabsContent>
            <TabsContent value="oneWeek">
              <div className={` h-full max-h-[400px]`}>
                <CustomChart
                  chartConfig={chartConfig}
                  chartData={chartData}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  tooltipFormatter={tooltipFormatter}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

type InstitutionCardProps = {
  icon: React.ReactElement;
  label: string;
  num: string;
  color: string;
  image?: string;
};

const InstitutionCards = ({
  icon,
  label,
  num,
  color,
  image,
}: InstitutionCardProps) => {
  return (
    <div
      className="w-full h-full relative grid rounded-2xl p-5"
      style={{ backgroundColor: color }}
    >
      <div className=" text-white flex flex-col gap-4">
        <div className="text-white w-full flex justify-between items-center">
          <p className="text-sm w-full max-w-[60%]">{label}</p>
          <div className="justify-self-start text-white border border-white w-[2.25rem] h-[2.25rem] rounded-[0.625rem] flex justify-center items-center p-1">
            {icon}
          </div>
        </div>
        <h2 className="text-[1.875rem]">{num}</h2>
      </div>
      <div className="justify-self-end absolute bottom-0 right-0">
        <img src={image} />
      </div>
    </div>
  );
};
