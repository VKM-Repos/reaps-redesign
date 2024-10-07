import { ColumnFiltersState } from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react'

type ColumnFilter = {
    id: string;      // Column ID to be filtered
    value: string | number | boolean | any;  // The value to filter by, can be any data type
};

type ColumnFilters = ColumnFilter[];

type GlobalFilterContextInterface = {
    globalFilter: string,
    setGlobalFilter: (globalFilter: string) => void,
    columnFilters: any,
    setColumnFilters: (columnFilters: any) => void,
}

const GlobalFilterContext =  createContext<GlobalFilterContextInterface>({} as GlobalFilterContextInterface);

export const GlobalFilterProvider = ({ children }: {children: React.ReactNode}) => {
    const [ globalFilter, setGlobalFilter] = useState('');
    const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([]);

    return (
        <GlobalFilterContext.Provider value={{globalFilter, setGlobalFilter, columnFilters, setColumnFilters}}>
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