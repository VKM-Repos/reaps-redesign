import SideBarProvider from "@/context/SideBarContext";
import { MobileProvider } from "@/context/MobileContext";
import { StepperProvider } from "@/context/StepperContext";
import { LogoutProvider } from "@/context/LogoutContext";


export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <LogoutProvider>
      <SideBarProvider>
        <MobileProvider>
          <StepperProvider>
            {children}
          </StepperProvider>
        </MobileProvider>
      </SideBarProvider>
    </LogoutProvider>
    
  )
}