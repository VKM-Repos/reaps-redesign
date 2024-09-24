import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

type MobileContextInterface = {
    isMobile: boolean,
    isSignUp: boolean,
    isDashboard: boolean
}

const MobileContext = createContext<MobileContextInterface>({} as MobileContextInterface);

export const MobileProvider = ({ children }: {children: React.ReactNode}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSignUp, setSignUp] = useState(false);
    const [isDashboard, setDashboard] = useState(false);

    const { pathname } = useLocation();

    const updateIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
    }

    const updateSignUp = () => {
        setSignUp(pathname === "/signup");
    }

    const updateDashboard = () => {
        setDashboard(pathname === "/");
    }

    useEffect(() => {
        updateIsMobile();
        updateSignUp();
        updateDashboard();
        window.addEventListener('resize', updateIsMobile);
        return () => window.removeEventListener('resize', updateIsMobile)
    }, [isMobile, isSignUp, isDashboard]);

    return (
        <MobileContext.Provider
            value={{
                isMobile,
                isSignUp,
                isDashboard
            }}
        >
            {children}
        </MobileContext.Provider>
    )
}

export const useMobileContext = () => {
    const context = useContext(MobileContext);
    if (!context) {
        throw new Error("useMobileContext must be used within a MobileProvider");
      }
      return context;
}