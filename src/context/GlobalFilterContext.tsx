import { formatISODate } from '@/lib/utils';
import { ColumnFiltersState, FilterFn } from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react'



type GlobalFilterContextInterface = {
    globalFilter: string,
    setGlobalFilter: (globalFilter: string) => void,
    columnFilters: any,
    setColumnFilters: (columnFilters: any) => void,
    multiStatusDateFilter: FilterFn<any>,
}

const GlobalFilterContext =  createContext<GlobalFilterContextInterface>({} as GlobalFilterContextInterface);

export const GlobalFilterProvider = ({ children }: {children: React.ReactNode}) => {
    const [ globalFilter, setGlobalFilter] = useState('');
    const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([]);
  

    const multiStatusDateFilter: FilterFn<any> = (row: any, columnId: any, filterValue: any) => {
        const rowValue = row.getValue(columnId);
      
        if (columnId === 'status') {
          // Filter by multiple statuses
          return filterValue.length === 0 || filterValue.includes(rowValue);
        }
      
        if (columnId === 'submission') {
          const { endDate, startDate } = filterValue;
          // Filter by date range
          return rowValue >= formatISODate(startDate) && rowValue <= formatISODate(endDate);
        }
        
      
        return true; // If no filters, return all rows
      };
  

    return (
        <GlobalFilterContext.Provider value={{globalFilter, setGlobalFilter, columnFilters, setColumnFilters, multiStatusDateFilter}}>
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