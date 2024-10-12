import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import ResearcherHomePage from "../view-researcher";
import InstitutionCardBg  from "/img/InstitutionCardBg.png"
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import FileView from "@/components/custom/Icons/FileView";
import RepeatIcon from "@/components/custom/Icons/Repeat";
import SignatureIcon from "@/components/custom/Icons/Signature";
import MoneyIcon from "@/components/custom/Icons/Money";
import FileRemove from "@/components/custom/Icons/FileRemove";
import { useState } from "react";

export default function InstitutionAdminHome() {
    const [activeStatsTab, setActiveStatsTab ] = useState("yourStats");

    return (
        <>
            <Tabs defaultValue="yourStats" onValueChange={(val) => setActiveStatsTab(val)}>
                <TabsList className="flex items-start gap-3">
                    <TabsTrigger value="yourStats" className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${activeStatsTab === "yourStats" && "bg-[#FFD13A]"}`}>Your stats</TabsTrigger>
                    <TabsTrigger value="adminStats" className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${activeStatsTab === "adminStats" && "bg-[#FFD13A]"}`}>Admin stats</TabsTrigger>
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
    const [activeTab, setActiveTab] = useState("allTime");

    return (
        <div className="flex flex-col gap-10 mt-[3.25rem]">
            <div className="grid md:grid-cols-4 gap-3">
                <div className="gap-4 flex items-center md:flex-col w-full">
                    <span className="max-h-[8.75rem] w-full">
                        <InstitutionCards icon={GoogleDoc()} label="Submitted Requests" num="24" color="#7D462A" />
                    </span>
                   
                    <span className="max-h-[8.75rem] w-full">
                        <InstitutionCards icon={FileView()} label="Review Requests" num="24" color="#891D1D" />
                    </span>
                </div>
                <div className="">
                    <InstitutionCards icon={RepeatIcon()} label="Re-opened Requests" num="24" color="#56163B" image={InstitutionCardBg}/>
                </div>
                <div>
                    <InstitutionCards icon={SignatureIcon()} label="Approved Requests" num="24" color="#0D304A" image={InstitutionCardBg}/>
                </div>
                <div className="gap-4 flex items-center md:flex-col">
                    <span className="max-h-[8.75rem] w-full">
                        <InstitutionCards icon={MoneyIcon()} label="Unconfirmed Payments" num="24" color="#0D304A" />
                    </span>
                    <span className="max-h-[8.75rem] w-full">
                        <InstitutionCards icon={FileRemove()} label="Declined Requests" num="24" color="#55336A" />
                    </span>    
                </div>
            </div>
            <div className="flex flex-col gap-[3.25rem]">
                <div className="flex justify-between items-center">
                    <h1 className="text-[1.375rem] font-bold">Request Submission Overview</h1>
                    <Tabs defaultValue="allTime" onValueChange={(val) => setActiveTab(val)}>
                        <TabsList className="flex items-start gap-3">
                            <TabsTrigger value="allTime" className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${activeTab === "allTime" && "bg-[#FFD13A]"}`}>All Time</TabsTrigger>
                            <TabsTrigger value="thisMonth" className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${activeTab === "thisMonth" && "bg-[#FFD13A]"}`}>This Month</TabsTrigger>
                            <TabsTrigger value="oneWeek"  className={`text-sm border border-[#0C0C0F29] py-2 px-4 rounded-[2.375rem] font-normal ${activeTab === "oneWeek" && "bg-[#FFD13A]"}`}>Last 7 days</TabsTrigger>
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

type InstitutionCardProps = {
    icon: React.ReactElement;
    label: string;
    num: string;
    color: string;
    image?: string;
}

const InstitutionCards = ({ icon, label, num, color, image }: InstitutionCardProps) => {
    return (
        <div className="w-full h-full relative grid rounded-2xl p-5" style={{backgroundColor: color}}>
            <div className=" text-white flex flex-col gap-4">
                <div className="text-white w-full flex justify-between items-center">
                    <p className="text-sm w-full max-w-[60%]">{label}</p>
                    <div className="justify-self-start text-white border border-white w-[2.25rem] h-[2.25rem] rounded-[0.625rem] flex justify-center items-center p-1">{icon}</div>
                    
                </div>
                <h2 className="text-[1.875rem]">{num}</h2>
                
                
            </div>
            <div className="justify-self-end absolute bottom-0 right-0"><img src={image} /></div>
        </div>
    )
}