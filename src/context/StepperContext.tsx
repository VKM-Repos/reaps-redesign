import { createContext, useContext, useState, ReactNode } from "react";

interface StepperContextProps {
    stepper: number;
    setStep: (step: number) => void;
}

const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export const useStepper = () => {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error("useStepper must be used within a StepperProvider");
    }
    return context;
};

export const StepperProvider = ({ children }: { children: ReactNode }) => {
    const [stepper, setStep] = useState(0);

    return (
        <StepperContext.Provider value={{ stepper, setStep }}>
            {children}
        </StepperContext.Provider>
    );
};