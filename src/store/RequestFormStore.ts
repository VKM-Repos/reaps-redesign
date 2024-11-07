import { create, StateCreator } from "zustand";
import {
    persist,
    PersistOptions,
} from "zustand/middleware";


export type FileDetails = {
    path: string;
    file: File | null;
};

type Reviewer = {
    firstName: string;
    lastName: string;
}


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
    loading: boolean;
    reviewer: Reviewer | null;
    reviewers: Reviewer[];
    success: boolean;
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
    setReviewer: (reviewer: Reviewer | null) => void;
    setReviewers: (reviewer: Reviewer[] ) => void;
    setSuccess: (success: boolean) => void
    setLoading: (loading: boolean) => void;
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
            loading: false,
            success: false,
            reviewer: null,
            reviewers: [],
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
            setSuccess: (success) => set({ success }),
            setReviewer: (reviewer) => set({ reviewer }),
            setReviewers: (reviewers) => set({ reviewers }),
            setLoading: (loading) => set({ loading }),
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
