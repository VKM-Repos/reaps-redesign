import CategoryTable from "./view-pricing";
import { categories } from "../requests/components/ethical-request-approval/data/categories";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  const handleFunc = () => {
    navigate("/pricing/your-transactions");
  };

  return (
    <>
      <div className="flex flex-col gap-[1.5rem] mb-20">
        <div className="flex flex-col gap-14 items-center">
          <div className="flex flex-col gap-[1.25rem] mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center">
              <h1 className="text-[1.875rem] font-bold">
                <span>Pricing</span>
              </h1>
              <p onClick={handleFunc}>
                <a className="text-sm text-[#192C8A]  font-semibold underline">
                  View your transactions
                </a>
              </p>
            </div>
            <p className="text-sm text-[#454745]">
              The pricing page helps you to get information on what you will be
              charged based on your category as a researcher.
            </p>
          </div>
          <CategoryTable categories={categories} />
        </div>
      </div>
    </>
  );
}
