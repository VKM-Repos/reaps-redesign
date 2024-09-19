import SideBarProvider from '@/context/SideBarContext';
import { MobileProvider } from '@/context/MobileContext';
import { StepperProvider } from '@/context/StepperContext';
import { LogoutProvider } from '@/context/LogoutContext';
import { RoleProvider } from '@/hooks/useRole';
import queryClientSettings from '@/config/queryClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(queryClientSettings);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LogoutProvider>
        <RoleProvider>
          <SideBarProvider>
            <MobileProvider>
              <StepperProvider>{children}</StepperProvider>
            </MobileProvider>
          </SideBarProvider>
        </RoleProvider>
      </LogoutProvider>
    </QueryClientProvider>
  );
};
