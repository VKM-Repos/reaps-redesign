import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";

import { useNavigate } from "react-router-dom";
import AssignedReuqustCard from "./custom/ReviewersDashboard";
import { useRole } from "@/hooks/useRole";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import ResearcherHomePage from "./view-researcher";
import InstitutionAdminHome from "./view-institution";



const Home = () => {
    // create handle open function
    
const navigate = useNavigate();
const { role } = useRole();
const [ loading, setLoading ] = useState(false);

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
        <div className="flex flex-col gap-10">
           { role === 'REVIEWER' && 
              <AssignedReuqustCard name="Vivian" reviewed="37" pending="5" />         
           }
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                    <h1 className="text-[1.875rem] font-bold">Summary</h1>
                    <Button onClick={handleFunc} className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"><span><GoogleDoc /></span>Request Ethical Approval</Button>
                </div>
                {role === 'INSTITUTION_ADMIN' ? <InstitutionAdminHome /> : <ResearcherHomePage />} 
            </div>
        </div>
      </> 
    )
}

export default Home;