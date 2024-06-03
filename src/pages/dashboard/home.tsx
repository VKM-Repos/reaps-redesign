import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import SummaryCard from "@/components/custom/SummaryCard";
import Loading from "@/components/custom/Icons/Loading";

const Home = () => {
    return (
        <div className="md:11/12 mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-[1.875rem] font-bold py-2">Summary</h1>
                <Button className="flex gap-2 px-6 py-3"><span><GoogleDoc /></span>Request Ethical Approval</Button>
            </div>
            <div className="w-full my-8 mx-auto flex gap-7 justify-center items-center">
                <SummaryCard icon={GoogleDoc()} label="Submitted" num="24" color="#4D4341"/>
               
                <SummaryCard icon={Loading()} label="Pending Requests" num="24" color="#713055"/>
            
                <SummaryCard icon={GoogleDoc()} label="Approved Requests" num="24" color="#254D4B"/>
                
            </div>
        </div>
    )
}

export default Home;