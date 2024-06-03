import SideBarProvider from "@/context/SideBarContext";


export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <SideBarProvider>{children}</SideBarProvider>
  )
}