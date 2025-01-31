import SideBarProvider from "@/context/SideBarContext";
import { MobileProvider } from "@/context/MobileContext";
import queryClientSettings from "@/config/queryClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalFilterProvider } from "@/context/GlobalFilterContext";
import { Toaster } from "@/components/ui/toaster";

export const queryClient = new QueryClient(queryClientSettings);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalFilterProvider>
        <SideBarProvider>
          <MobileProvider>
            {children}
            <Toaster />
          </MobileProvider>
        </SideBarProvider>
      </GlobalFilterProvider>
    </QueryClientProvider>
  );
};
