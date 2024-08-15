import { createContext, useContext, useState, ReactNode } from "react";

interface StepperContextProps {
    step: number;
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
    const [step, setStep] = useState(0);

    return (
        <StepperContext.Provider value={{ step, setStep }}>
            {children}
        </StepperContext.Provider>
    );
};