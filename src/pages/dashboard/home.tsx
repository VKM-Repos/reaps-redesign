import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import DocValidation from "@/components/custom/Icons/DocValidation";
import SummaryCard from "@/components/custom/SummaryCard";
import Loading from "@/components/custom/Icons/Loading";
import TemplateCard from "@/components/custom/TemplateCard";
import NotificationCard from "@/components/custom/NotificationCard"
import { Sheet } from "@/components/ui/sheet";

const Home = () => {
    return (
        <div className="md:4/5 mx-auto max-w-4xl flex flex-col gap-10">
            <div className="flex flex-col gap-[3.25rem]">
                <div className="flex flex-col md:flex-row justify-between items-center mx-auto w-full">
                    <h1 className="text-[1.875rem] font-bold">Summary</h1>
                    <Button className="flex gap-2 px-6"><span><GoogleDoc /></span>Request Ethical Approval</Button>
                </div>
                <div className="w-full my-8 mx-auto flex md:flex-row gap-7 flex-col items-center justify-between">
                    <SummaryCard icon={GoogleDoc()} label="Submitted" num="24" color="#4D4341"/>
                
                    <SummaryCard icon={Loading()} label="Pending Requests" num="24" color="#713055"/>
                
                    <SummaryCard icon={DocValidation()} label="Approved Requests" num="24" color="#254D4B"/>
                </div>
            </div>
            <div className="flex flex-col gap-[3.25rem]">
                <h1 className="text-[1.375rem] font-bold">Institution Research Template</h1>
                <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-7">
                    <TemplateCard />
                    <TemplateCard />
                    <TemplateCard />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-[1.375rem] font-bold">Recent Activities</h1>
                <div className="w-full mt-8 mx-auto flex flex-col items-center">
                    {/* remove redundant styles, set mapping by value id */}
                    <Sheet>
                        <NotificationCard value="item-1" title="Your ethics approval request has been approved" time="14:23" />
                        <NotificationCard value="item-2" title="Your Ethics Approval Request has been successfully submitted" time="14:23"/>
                        <NotificationCard value="item-3" title="Your Ethics Approval Request has been successfully submitted" time="14:23"/>
                        <NotificationCard value="item-4" title="Your Ethics Approval Request has been successfully submitted" time="14:23"/>
                        <NotificationCard value="item-5" title="Your Ethics Approval Request has been successfully submitted" time="14:23"/>
                        <NotificationCard value="item-6" title="Your Ethics Approval Request has been successfully submitted" time="14:23"/>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default Home;