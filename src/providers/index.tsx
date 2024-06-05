import SideBarProvider from "@/context/SideBarContext";
import { MobileProvider } from "@/context/MobileContext";


export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <SideBarProvider>
      <MobileProvider>
        {children}
      </MobileProvider>
    </SideBarProvider>
  )
}