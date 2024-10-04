import { createContext, useContext, useState } from 'react'

type GlobalFilterContextInterface = {
    globalFilter: string,
    setGlobalFilter: (globalFilter: string) => void
}

const GlobalFilterContext =  createContext<GlobalFilterContextInterface>({} as GlobalFilterContextInterface);

export  const MobileProvider = ({ children }: {children: React.ReactNode}) => {
    const [ globalFilter, setGlobalFilter] = useState('');

    return (
        <GlobalFilterContext.Provider value={{globalFilter, setGlobalFilter}}>
            {children}
        </GlobalFilterContext.Provider>
    )
}

export const useGlobalFilter = () => {
    const context = useContext(GlobalFilterContext);
    if (!context) {
        throw new Error("useGlobalFilter must be used within a StepperProvider");
    }
    return context;
};