import { Button } from "@/components/ui/button";
import CategoryTable from "./view-pricing";
import { categories } from "../requests/components/ethical-request-approval/data/categories";
import { useState } from "react";
import ViewTransactions from "./view-transactions";

export default function Pricing() {
    const [ showTransactions, setShowTransactions ] = useState(false);
    const handleFunc = () => {
        setShowTransactions(true);
    }
    return (
        <div className="flex flex-col gap-[1.5rem] mb-20">
            {showTransactions ?
                <ViewTransactions setShowTransactions={setShowTransactions}/> :
            <>
                <div className="flex flex-col gap-[1.25rem] mx-auto w-full">
                    <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center">
                        <h1 className="text-[1.875rem] font-bold">Pricing</h1>
                        <p onClick={handleFunc}><a className="text-sm text-primary font-semibold underline">View your transactions</a></p>
                    </div>
                    <p className="text-sm text-[#454745]">The pricing page helps you to get information on what you will be charged based on your category as a researcher.</p>
                    <Button className="flex gap-4 items-center justify-center py-3 px-6 w-full max-w-[10rem]">New Category</Button>
                </div>
                <CategoryTable categories={categories}/>
            </>
        }
            
            
        </div>
    )
}