import { create, StateCreator } from "zustand";
import {
  persist,
  PersistOptions,
} from "zustand/middleware";

export interface OnboardingFormStore {
  step: number;
  data: {
    onboardingDetails: {
      email: string;
      code: string;
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
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<OnboardingFormStore>,
  options: PersistOptions<OnboardingFormStore>
) => StateCreator<OnboardingFormStore>;

export const useOnboardingFormStore = create<OnboardingFormStore>(
  (persist as MyPersist)(
    (set) => ({
      step: 1,
      data: {
        onboardingDetails: {
          email: '',
          code: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          password: " ",
          dob: new Date(),
          education: "",
          notifications: false,
        },
       
      },
      setStep: (step) => set({ step }),
      setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
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
              password: " ",
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