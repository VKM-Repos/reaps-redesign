import { create, StateCreator } from "zustand";
import {
    persist,
    PersistOptions,
  } from "zustand/middleware";

  export interface SpecializationsStore {
    loading: boolean,
    step: number;
    data: {
      specializationsDetails: {
        specialization: string;
        keyword: string[] | null;
      };
     
    };
    setStep: (step: number) => void;
    setData: (data: Partial<SpecializationsStore["data"]>) => void;
    setLoading: (loading: boolean) => void;
    resetStore: () => void;
  }
  
  type MyPersist = (
    config: StateCreator<SpecializationsStore>,
    options: PersistOptions<SpecializationsStore>
  ) => StateCreator<SpecializationsStore>;
  
export const useSpecializationsStore = create<SpecializationsStore>(
    (persist as MyPersist)(
        (set) => ({
            loading: false,
            step: 1,
            data: {
                specializationsDetails: {
                    specialization: '',
                    keyword: null
                },
            },
            setStep: (step) => set({ step }),
            setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
            setLoading: (loading) => set({ loading }),
            resetStore: () => {
            set({
                step: 1,
                data: {
                    specializationsDetails: {
                        specialization: '',
                        keyword: null
                    }
                }
            });
            localStorage.removeItem("specializationsStore");
        },
    }),
    {
        name: "SpecializationsStore",
    }
    )
);