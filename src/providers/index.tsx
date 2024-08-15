import SideBarProvider from "@/context/SideBarContext";
import { MobileProvider } from "@/context/MobileContext";
import { StepperProvider } from "@/context/StepperContext";


export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <SideBarProvider>
      <MobileProvider>
        <StepperProvider>
          {children}
        </StepperProvider>
      </MobileProvider>
    </SideBarProvider>
  )
}