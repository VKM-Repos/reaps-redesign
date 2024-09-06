import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingFormStore } from '../store/CreateOnboardingFormStore';

interface LogoutContextProps {
    loading: boolean;
    handleLogOut: () => void;
}

const LogoutContext = createContext<LogoutContextProps | undefined>(undefined);

export const useLogout = () => {
    const context = useContext(LogoutContext);
    if (!context) {
        throw new Error('useLogout must be used within a LogoutProvider');
    }
    return context;
};

export const LogoutProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { resetStore } = useOnboardingFormStore();

   

    const handleLogOut = () => {
        setLoading(true);
        setTimeout(() => {
            resetStore();
            navigate('/login');
            setLoading(false);
          }, 3000);
        
    }
    return (
        <LogoutContext.Provider value={{ loading, handleLogOut }}>
            {children}
        </LogoutContext.Provider>
    );
};