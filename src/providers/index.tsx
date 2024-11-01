import SideBarProvider from '@/context/SideBarContext';
import { MobileProvider } from '@/context/MobileContext';
import { StepperProvider } from '@/context/StepperContext';
import { RoleProvider } from '@/hooks/useRole';
import queryClientSettings from '@/config/queryClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalFilterProvider } from '@/context/GlobalFilterContext';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient(queryClientSettings);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalFilterProvider>
        <RoleProvider>
          <SideBarProvider>
            <MobileProvider>
              <StepperProvider>{children}</StepperProvider>
              <Toaster />
            </MobileProvider>
          </SideBarProvider>
        </RoleProvider>
      </GlobalFilterProvider>
    </QueryClientProvider>
  );
};
