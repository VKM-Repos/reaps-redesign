import DocValidation from "@/components/custom/Icons/DocValidation";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import SummaryCard from "@/pages/dashboard/home/custom/SummaryCard";
import Loading from "@/components/custom/Icons/Loading";
import TemplateCard from "@/pages/dashboard/home/custom/TemplateCard";
import NotificationCard from "@/pages/dashboard/home/custom/NotificationCard"
import {useGET} from "@/hooks/useGET.hook.ts";

const notifications = [
    {
      id: "1",
      title: "Your ethics approval request has been approved",
      time: "14:23",
    },
    {
      id: "2",
      title: "Your ethics approval request has been approved",
      time: "14:23",
    },
    {
      id: "3",
      title: "Your ethics approval request has been approved",
      time: "14:23",
    },
    {
      id: "4",
      title: "Your ethics approval request has been approved",
      time: "14:23",
    },
    {
      id: "5",
      title: "Your ethics approval request has been approved",
      time: "14:23",
    },

]


export default function ResearcherHomePage() {
    const {
        data: templates,
    } = useGET({
        url: "templates",
        queryKey: ["GET_TEMPLATES_DASHBOARD"],
    });

    return (
        <div className="flex flex-col gap-10">
            <div className="">
                <div className="w-full my-8 mx-auto flex md:flex-row gap-7 flex-col items-center justify-between">
                    <SummaryCard icon={GoogleDoc()} label="Submitted" num="24" color="#4D4341"/>
                
                    <SummaryCard icon={Loading()} label="Pending Requests" num="24" color="#713055"/>
                
                    <SummaryCard icon={DocValidation()} label="Approved Requests" num="24" color="#254D4B"/>
                </div>
            </div>
            {templates?.items?.length > 0 &&
             <div className="flex flex-col gap-[3.25rem]">
              <h1 className="text-[1.375rem] font-bold">Institution Research Template</h1>
              <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-7 overflow-x-scroll scrollbar-hide">
                  {templates?.items?.map((template: any)=>(<TemplateCard template={template} />))}
              </div>
            </div>}
            <div className="flex flex-col gap-4">
                <h1 className="text-[1.375rem] font-bold">Recent Activities</h1>
                <div className="w-full mt-8 mb-24 mx-auto flex flex-col items-center">                     
                  {notifications.map((notification: any) => (
                    <NotificationCard id={notification.id} key={notification.id} title={notification.title} time={notification.time} />
                  ))}
                </div>
            </div>
        </div>
    )
}
