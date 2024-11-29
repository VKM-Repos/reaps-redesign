import { Button } from "@/components/ui/button"
import GoogleDoc from "@/components/custom/Icons/GoogleDoc"
import GoogleDocLarge from "@/components/custom/Icons/GoogleDocLarge"
import { useState } from "react"
import Loader from "@/components/custom/Loader"
import { useNavigate } from "react-router-dom"


export default function EmptyRequests({ activeTab = "request table" }: { activeTab?: string }) {
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const handleFunc = () => {
        setLoading(true);

        setTimeout(() => {
          navigate('/requests/create');
          setLoading(false); 
        }, 5000);
      };
    return (
        <>
            {loading && <Loader />}
            <div className="mx-auto my-0 w-full md:4/5 flex flex-col justify-center items-center mb-10">
                <div className="w-[96px] h-[96px] pl-2 mx-auto mt-[6rem] mb-4 md:mb-[6rem] rounded-full flex justify-center items-center bg-[#FFD13A] ">
                        <GoogleDocLarge />
                </div>
                <div className="flex flex-col gap-6 w-full max-w-[37rem] text-center">
                    <h1 className="text-[1.625rem] leading-8 font-bold">Research ethics approval made easy</h1>
                    <p>Enjoy efficiency, transparency, and accountability while eliminating material losses and communication delays in the review process</p>
                    <Button onClick={() => {handleFunc()}} className="flex gap-4 items-center justify-center py-3 px-6 w-full max-w-[16rem] mx-auto"><span><GoogleDoc /></span>Request Ethical Approval</Button>
                    {activeTab === "review table" && <Button onClick={() => {handleFunc()}} className="flex gap-4 items-center justify-center py-3 px-6 w-full max-w-[16rem] mx-auto"><span><GoogleDoc /></span>View Submitted Requests</Button>}
                </div>
            </div>
        </>   
    )
}