import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import ResearcherHomePage from "../view-researcher";
import { SummaryProps } from "../custom/SummaryCard";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import FileView from "@/components/custom/Icons/FileView";
import RepeatIcon from "@/components/custom/Icons/Repeat";
import SignatureIcon from "@/components/custom/Icons/Signature";
import MoneyIcon from "@/components/custom/Icons/Money";
import FileRemove from "@/components/custom/Icons/FileRemove";

export default function InstitutionAdminHome() {
    return (
        <>
            <Tabs defaultValue="yourStats" className="">
                <TabsList className="flex items-start gap-6">
                    <TabsTrigger value="yourStats">Your Stats</TabsTrigger>
                    <TabsTrigger value="adminStats">Admin Stats</TabsTrigger>
                </TabsList>
                <TabsContent value="yourStats">
                    <ResearcherHomePage />
                </TabsContent>
                <TabsContent value="adminStats">
                    <InstitutionAdminHomePage />
                </TabsContent>
            </Tabs>
        </>
    )
}

const InstitutionAdminHomePage = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="grid grid-cols-4 gap-3">
                <div className="gap-4 flex items-center md:flex-col">
                    <InstitutionCards icon={GoogleDoc()} label="Submitted Requests" num="24" color="#7D462A" />
                    <InstitutionCards icon={FileView()} label="Review Requests" num="24" color="#891D1D" />
                </div>
                <div>
                    <InstitutionCards icon={RepeatIcon()} label="Re-opened Requests" num="24" color="#56163B" />
                </div>
                <div>
                    <InstitutionCards icon={SignatureIcon()} label="Approved Requests" num="24" color="#0D304A" />
                </div>
                <div className="gap-4 flex items-center md:flex-col">
                    <InstitutionCards icon={MoneyIcon()} label="Unconfirmed Payments" num="24" color="#0D304A" />
                    <InstitutionCards icon={FileRemove()} label="Declined Requests" num="24" color="#55336A" />
                </div>
            </div>
            <div className="flex flex-col gap-[3.25rem]">
                <div className="flex justify-between items-center">
                    <h1 className="text-[1.375rem] font-bold">Request Submission Overview</h1>
                    <Tabs defaultValue="allTime" className="">
                        <TabsList className="flex items-start gap-6">
                            <TabsTrigger value="allTime">All Time</TabsTrigger>
                            <TabsTrigger value="thisMonth">This Month</TabsTrigger>
                            <TabsTrigger value="oneWeek">Last 7 days</TabsTrigger>
                        </TabsList>
                        <TabsContent value="allTime">
                            {/* <ResearcherHomePage /> */}
                        </TabsContent>
                        <TabsContent value="thisMonth">
                            {/* <InstitutionAdminHomePage /> */}
                        </TabsContent>
                        <TabsContent value="oneWeek">
                            {/* <InstitutionAdminHomePage /> */}
                        </TabsContent>
                    </Tabs>
                </div>
                
            </div>
        </div>
    )
}

const InstitutionCards = ({ icon, label, num, color }: SummaryProps) => {
    return (
        <div className="w-full max-w-[13rem] flex justify-between items-start rounded-2xl p-5" style={{backgroundColor: color}}>
            <div className="px-4 py-1 text-white">
                <div className="my-8 text-white border border-white w-[2.25rem] h-[2.25rem] rounded-[0.625rem] flex justify-center items-center">{icon}</div>
                <div className="text-white">
                    <p className="text-sm">{label}</p>
                    <h2 className="text-[1.875rem]">{num}</h2>
                </div>
            </div>
        </div>
    )
}