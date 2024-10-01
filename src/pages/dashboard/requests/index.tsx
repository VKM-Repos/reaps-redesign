import { reviewTableData, tableData } from "@/lib/helpers";
import TableRequests from "./components/table-requests";
import TableReview from "./components/table-review";
import EmptyRequests from "./components/emptystate";
import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useRole } from "@/hooks/useRole";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";

export default function Requests() {
    const { role } = useRole();
    const [ loading, setLoading ] = useState(false);
    const [ activeTab, setActiveTab ] = useState("requests table")
    const navigate = useNavigate()

    const handleFunc = () => {
        setLoading(true);
        setTimeout(() => {
          navigate('/requests/create');
          setLoading(false); 
        }, 5000);
      };

    //   if active tab is requests table, set functions based on active tab

    return (
        <>
        {loading && <Loader />}
            <div className="flex flex-col gap-12 mb-20">
                <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                    <h1 className="text-[1.875rem] font-bold">Requests</h1>
                    {tableData.length > 0 && <Button onClick={handleFunc} className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"><span><GoogleDoc /></span>Request Ethical Approval</Button>}
                </div>
                {/* tab */}
                {tableData && tableData.length > 0 ?
                    <div>
        
                    {role === 'RESEARCHER' && 
                        <TableRequests tableData={tableData} />}
                        {role === 'REVIEWER' &&
                            <Tabs defaultValue="request table" onValueChange={(val) => setActiveTab(val)}>
                                <TabsList className="border-b-[1.5px] w-full px-3">
                                    <TabsTrigger value="request table">My request</TabsTrigger>
                                    <TabsTrigger value="review table">Review request</TabsTrigger>
                                </TabsList>
                        
                                <TabsContent value="request table">
                                    <TableRequests tableData={tableData} />
                                </TabsContent>
                                <TabsContent value="review table">
                                    <TableReview reviewTableData={reviewTableData} />
                                </TabsContent>
                            </Tabs>
                        }
                    </div>
                    :
                    <EmptyRequests />
                }
            </div>
        </>
   
    )
}