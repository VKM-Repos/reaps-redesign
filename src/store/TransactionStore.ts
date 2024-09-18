import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { transactions } from "@/pages/dashboard/pricing/data/transactions";



export interface Transaction {
  reference: string;
  id: string;
  date: string;
  status: string;
  amount: string;
}

export interface TransactionStore {
  loading: boolean;
  data: {
    transactions: Transaction[];
    receipt: File | null ;
  };
  setTransactions: () => void;
  setReceipt: (file: File) => void; 
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<TransactionStore>,
  options: PersistOptions<TransactionStore>
) => StateCreator<TransactionStore>;

export const useTransactionStore = create<TransactionStore>(
  (persist as MyPersist)(
    (set) => ({
      loading: false,
      data: {
        transactions: [], 
        receipt: null,    
      },
      setTransactions: () =>
        set({
          data: {
            transactions: transactions,
            receipt: null,
          },
        }),
      setReceipt: (file) =>
        set((state) => ({
          data: { ...state.data, receipt: file },
        })),
      setLoading: (loading) => set({ loading }),
      resetStore: () => {
        set({
          loading: false,
          data: {
            transactions: [],
            receipt: null,
          },
        });
        localStorage.removeItem("TransactionStore");
      },
    }),
    {
      name: "TransactionStore", // Persist data under this key in localStorage
    }
  )
);