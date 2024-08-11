import { create, StateCreator } from "zustand";
import {
    persist,
    PersistOptions,
} from "zustand/middleware";


// export interface CheckboxGroup {
//     [key: string]: {
//       label: string;
//       value: boolean;
//     };
//   };

export type CheckboxGroup = {
    id: string;
    question: string;
    options: {
      label: string;
      value: boolean;
    }[]
  };

export interface RequestsStore {
    
    step: number;
    data: {
      requestsDetails: {
        checkbox: CheckboxGroup[] | null;
        specialisation: string;
        institution: string;
        title: string;
        objectives: string;
      };
     
    };
    setStep: (step: number) => void;
    setData: (data: Partial<RequestsStore["data"]>) => void;
    resetStore: () => void;
}

type MyPersist = (
    config: StateCreator<RequestsStore>,
    options: PersistOptions<RequestsStore>
  ) => StateCreator<RequestsStore>;

  export const useRequestsStore = create<RequestsStore>(
    (persist as MyPersist)(
        (set) => ({
            step: 1,
            data: {
                requestsDetails: {
                    checkbox: null,
                    specialisation: '',
                    institution: '',
                    title: '',
                    objectives: ''
                },
            },
            setStep: (step) => set({ step }),
            setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
            resetStore: () => {
            set({
                step: 1,
                data: {
                    requestsDetails: {
                        checkbox: null,
                        specialisation: '',
                        institution: '',
                        title: '',
                        objectives: ''
                    }
                }
            });
            localStorage.removeItem("requestsStore");
        },
    }),
    {
        name: "RequestsStore",
    }
    )
);
