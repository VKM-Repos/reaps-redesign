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

export type FileDetails = {
    path: string;
    file: File | null;
};


export type CheckboxGroup = {
    question1: string,
    question2: string,
    question3: string,
    question4: string,
    question5: string,
    question6: string,
    question7: number
};

export type fileGroup = {
    requirement1: FileDetails,
    requirement2: FileDetails,
    requirement3: FileDetails,
    requirement4: FileDetails,
    requirement5: FileDetails,
    requirement6: FileDetails,
    requirement7: FileDetails,
    requirement8: FileDetails,
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
    setFiles: (files: Partial<fileGroup>) => void;
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
            setFiles: (files) =>
                set((state) => ({
                  data: {
                    ...state.data,
                    requestsDetails: {
                      ...state.data.requestsDetails,
                      files: { ...state.data.requestsDetails.files, ...files },
                    },
                  },
                })),
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
