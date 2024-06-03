import { MobileProvider } from "@/context/MobileContext";
import { Outlet } from "react-router-dom"



export default function AuthLayout() {
    return(
        <MobileProvider>
            <main className="min-h-screen w-full flex flex-col items-center">
                <div className="w-full">
                    <div className="mx-auto my-0">
                        <Outlet />
                    </div>
                </div>
            </main>
        </MobileProvider> 
        
    )
}