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
    question1: string,
    question2: string,
    question3: string,
    question4: string,
    question5: string,
    question6: string,
    question7: number
};

type fileGroup = {
    requirement1: string,
    requirement2: string,
    requirement3: string,
    requirement4: string,
    requirement5: string,
    requirement6: string,
    requirement7: string,
    requirement8: string,
}

export interface RequestsStore {
    
    step: number;
    data: {
      requestsDetails: {
        checkbox: CheckboxGroup | {};
        specialisation: string;
        institution: string;
        title: string;
        objectives: string;
        files: fileGroup | {};
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
                    checkbox: {},
                    specialisation: '',
                    institution: '',
                    title: '',
                    objectives: '',
                    files: {}
                },
            },
            setStep: (step) => set({ step }),
            setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
            resetStore: () => {
            set({
                step: 1,
                data: {
                    requestsDetails: {
                        checkbox: {},
                        specialisation: '',
                        institution: '',
                        title: '',
                        objectives: '',
                        files: {}
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
