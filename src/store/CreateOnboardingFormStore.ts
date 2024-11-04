import { create, StateCreator } from "zustand";
import {
  persist,
  PersistOptions,
} from "zustand/middleware";

export interface OnboardingFormStore {
  loading: boolean;
  step: number;
  data: {
    onboardingDetails: {
      email: string;
      code: string;
      orcid: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      password: string;
      dob: Date;
      education: string;
      notifications: boolean;
    };
   
  };
  setStep: (step: number) => void;
  setData: (data: Partial<OnboardingFormStore["data"]>) => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<OnboardingFormStore>,
  options: PersistOptions<OnboardingFormStore>
) => StateCreator<OnboardingFormStore>;

export const useOnboardingFormStore = create<OnboardingFormStore>(
  (persist as MyPersist)(
    (set) => ({
      loading: false,
      step: 1,
      data: {
        onboardingDetails: {
          email: '',
          code: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          password: "",
          dob: new Date(),
          orcid: "",
          education: "",
          notifications: false,
        },
       
      },
      setStep: (step) => set({ step }),
      setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
      setLoading: (loading) => set({ loading }),
      resetStore: () => {
        set({
          step: 1,
          data: {
            onboardingDetails: {
              email: '',
              code: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
              password: "",
              orcid: "",
              dob: new Date(),
              education: "",
              notifications: false,
            },
          },
        });
        localStorage.removeItem("OnboardingFormStore");
      },
    }),
    {
      name: "OnboardingFormStore",
    }
  )
);