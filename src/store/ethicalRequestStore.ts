import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface EthicalRequestQuestions {
  [key: string]: string | number | boolean | null;
}

export interface EthicalRequestFiles {
  [fileName: string]: File | null;
}

export interface EthicalRequestStore {
  step: number;
  data: {
    ethical_request_questions: EthicalRequestQuestions;
    ethical_request_files: EthicalRequestFiles;
    evidence_of_payment: EthicalRequestFiles;
    can_edit: boolean;
  };
  setStep: (step: number) => void;
  setData: (data: Partial<EthicalRequestStore["data"]>) => void;
  resetStore: () => void;
  addFile: (fileName: string, file: File) => void;
  removeFile: (fileName: string) => void;
}

type MyPersist = (
  config: StateCreator<EthicalRequestStore>,
  options: PersistOptions<EthicalRequestStore>
) => StateCreator<EthicalRequestStore>;

export const useEthicalRequestStore = create<EthicalRequestStore>(
  (persist as MyPersist)(
    (set) => ({
      step: 1,
      data: {
        ethical_request_questions: {},
        ethical_request_files: {},
        evidence_of_payment: {},
        can_edit: true,
      },

      setStep: (step) => set({ step }),

      setData: (data) =>
        set((state) => ({
          data: {
            ...state.data,
            ...data,
          },
        })),

      addFile: (fileName, file) =>
        set((state) => ({
          data: {
            ...state.data,
            ethical_request_files: {
              ...state.data.ethical_request_files,
              [fileName]: file,
            },
          },
        })),

      removeFile: (fileName) =>
        set((state) => ({
          data: {
            ...state.data,
            ethical_request_files: {
              ...state.data.ethical_request_files,
              [fileName]: null,
            },
          },
        })),

      resetStore: () => {
        set({
          step: 1,
          data: {
            ethical_request_questions: {},
            ethical_request_files: {},
            evidence_of_payment: {},
            can_edit: true,
          },
        });
        localStorage.removeItem("EthicalRequestStore");
      },
    }),
    {
      name: "EthicalRequestStore",
    }
  )
);
