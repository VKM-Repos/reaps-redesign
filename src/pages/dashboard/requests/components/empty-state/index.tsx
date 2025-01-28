import { Button } from "@/components/ui/button";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import GoogleDocLarge from "@/components/custom/Icons/GoogleDocLarge";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/user-store";

export default function EmptyRequests({
  setActiveTab,
}: {
  setActiveTab?: (activeTab: string) => void;
}) {
  const navigate = useNavigate();
  const { activeRole } = useUserStore();

  const handleFunc = () => {
    navigate("/requests/create");
  };

  const ViewRequestsToReview = () => {
    if (setActiveTab) {
      setActiveTab("review table");
    }
  };
  return (
    <>
      <div className="mx-auto my-0 w-full md:4/5 flex flex-col justify-center items-center mb-10">
        <div className="w-[96px] h-[96px] pl-2 mx-auto mt-[6rem] mb-4 md:mb-[6rem] rounded-full flex justify-center items-center bg-[#FFD13A] ">
          <GoogleDocLarge />
        </div>
        <div className="flex flex-col gap-6 w-full max-w-[37rem] text-center">
          <h1 className="text-[1.625rem] leading-8 font-bold">
            Research ethics approval made easy
          </h1>
          <p>
            Enjoy efficiency, transparency, and accountability while eliminating
            material losses and communication delays in the review process
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                handleFunc();
              }}
              className="flex gap-4 items-center justify-center py-3 px-6 w-full max-w-[16rem] mx-auto"
            >
              <span>
                <GoogleDoc />
              </span>
              Request Ethical Approval
            </Button>
            {activeRole === "reviewer" && (
              <button
                onClick={() => {
                  ViewRequestsToReview();
                }}
                className="border border-[#14155E] text-[#0D1F00] py-3 px-3 text-sm w-full max-w-[16rem] mx-auto"
              >
                Review Submitted Requests
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
