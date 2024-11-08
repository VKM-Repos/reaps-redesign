import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
// import { transactions } from "@/pages/dashboard/pricing/data/transactions";



// export interface Transaction {
//   reference: string;
//   id: string;
//   date: string;
//   status: string;
//   amount: string;
// }

export interface TemplateStore {
  loading: boolean;
  data: {
    template_name: string,
    template: File | null ;
    // templates: File[];
    
  };
//   setTransactions: () => void;
    setTemplateName: (template_name: string) => void;
    setTemplate: (file: File) => void; 
    setLoading: (loading: boolean) => void;
    resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<TemplateStore>,
  options: PersistOptions<TemplateStore>
) => StateCreator<TemplateStore>;

export const useTemplateStore = create<TemplateStore>(
  (persist as MyPersist)(
    (set) => ({
      loading: false,
      data: {
        // transactions: [], 
        template_name: '',
        template: null,    
      },
    //   setTransactions: () =>
    //     set({
    //       data: {
    //         template: null,
    //         // templates: null
    //       },
    //     }),
        setTemplateName: (name) => 
            set((state) => ({
               data: { ...state.data, template_name: name}, 
            })),
        setTemplate: (file) =>
            set((state) => ({
            data: { ...state.data, template: file },
            })),
      setLoading: (loading) => set({ loading }),
      resetStore: () => {
        set({
          loading: false,
          data: {
            // transactions: [],
            template_name: '',
            template: null,
          },
        });
        localStorage.removeItem("TemplateStore");
      },
    }),
    {
      name: "TemplateStore",
    }
  )
);