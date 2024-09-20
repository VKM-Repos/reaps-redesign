import { create, StateCreator } from "zustand";
import {
    persist,
    PersistOptions,
  } from "zustand/middleware";

  export interface CategoryStore {
    step: number;
    data: {
      categoryDetails: {
        title: string;
        pricing: string;
      };
     
    };
    setStep: (step: number) => void;
    setData: (data: Partial<CategoryStore["data"]>) => void;
    resetStore: () => void;
  }
  
  type MyPersist = (
    config: StateCreator<CategoryStore>,
    options: PersistOptions<CategoryStore>
  ) => StateCreator<CategoryStore>;
  
export const useCategoryStore = create<CategoryStore>(
    (persist as MyPersist)(
        (set) => ({
            step: 1,
            data: {
                categoryDetails: {
                    title: '',
                    pricing: ''
                },
            },
            setStep: (step) => set({ step }),
            setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
            resetStore: () => {
            set({
                step: 1,
                data: {
                   categoryDetails: {
                        title: '',
                        pricing: ''
                   }
                }
            });
            localStorage.removeItem("CategoryStore");
        },
    }),
    {
        name: "CategoryStore",
    }
    )
);