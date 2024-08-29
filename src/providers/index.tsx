import SideBarProvider from "@/context/SideBarContext";
import { MobileProvider } from "@/context/MobileContext";
import { StepperProvider } from "@/context/StepperContext";
import { LogoutProvider } from "@/context/LogoutContext";
import { RoleProvider } from "@/hooks/useRole";


export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <LogoutProvider>
      <RoleProvider>
        <SideBarProvider>
          <MobileProvider>
            <StepperProvider>
              {children}
            </StepperProvider>
          </MobileProvider>
        </SideBarProvider>
      </RoleProvider>
    </LogoutProvider>
    
  )
}