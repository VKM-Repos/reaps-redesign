import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";

import { useNavigate } from "react-router-dom";
import AssignedReuqustCard from "./reviewer/ReviewersDashboard";
import { useEffect, useState } from "react";
import Loader from "@/components/custom/Loader";
import ResearcherHomePage from "./researcher";
import InstitutionAdminHome from "./institution";
import useUserStore from "@/store/user-store";
import SuperAdminHome from "./super-admin";
import { useGET } from "@/hooks/useGET.hook";

const Home = () => {
  // create handle open function

  const navigate = useNavigate();
  const { activeRole, user } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleFunc = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/requests/create");
      setLoading(false);
    }, 5000);
  };

  const fetchUrls: Record<string, string> = {
    submitted: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Submitted`,
    approved: `requests/users/me?sort_direction=asc&skip=0&limit=100&status=Approved`,
    pending: `transactions`,
    reviews: `reviews/reviewer`,
  };


   const { data: submitted, refetch: refetch_submitted } = useGET({
          url: fetchUrls.submitted,
          queryKey: ["FETCH_SUBMITTED_REQUESTS"],
          // enabled: !!tabFetchUrls[],
        });

    const { data: approved, refetch: refetch_approved } = useGET({
      url: fetchUrls.approved,
      queryKey: ["FETCH_APPROVED_REQUESTS"]
    })

    const { data: pending, refetch: refetch_pending } = useGET({
      url: fetchUrls.pending,
      queryKey: ["FETCH_PENDING_TRANSACTIONS"]
    })

    const { data: reviews, refetch: refetch_reviews } = useGET({
      url: fetchUrls.reviews,
      queryKey: ["FECTH_REVIEWS"]
    })
  
      // const { data: transactions, refetch: refetch_transactions } = useGET({
      //     url: "transactions",
      //     queryKey: ["FETCH_TRANSACTIONS"],
  
      // }) 

      // const { data: }
  
        const reviewed_requests = (
          reviews && 
              reviews?.items.filter((item: any) => (
                  item.status ? "Unsatifactory" : "Satisfactory"
              )) || []
        )
  
        const pending_transactions = (
          pending && 
              pending?.items.filter((item: any) => (
                  item.status === "PENDING"
              )) || []
        )

       
  
        useEffect(() => {
          refetch_reviews();
          refetch_pending();
          refetch_approved();
          refetch_submitted();
        }, [])
  


  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col gap-10">
        {activeRole === "reviewer" && (
          <AssignedReuqustCard name={user?.first_name ?? ""} reviewed={reviewed_requests} pending={pending_transactions} />
        )}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
            <h1 className="text-[1.875rem] font-bold">Summary</h1>
            <Button
              onClick={handleFunc}
              className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]"
            >
              <span>
                <GoogleDoc />
              </span>
              Request Ethical Approval
            </Button>
          </div>
          {activeRole === "admin" || activeRole === "super admin" ? (
            activeRole === "admin" ? (
              <InstitutionAdminHome submitted={submitted?.items.length} approved={approved?.items.length} pending={pending.length}/>
            ) : (
              <SuperAdminHome />
            )
          ) : (
            <ResearcherHomePage submitted={submitted?.items.length} approved={approved?.items.length} pending={pending.length}/>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
