/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface OnboardingFormStore {
  loading: boolean;
  step: number;
  data: {
    onboardingDetails: {
      email: string;
      gender: any;
      verification_code: string;
      country_code: string;
      orcid_number: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      password: string;
      date_of_birth: string;
      education_level: any;
      notifications: boolean;
    };
  };
  setStep: (step: number) => void;
  setData: (data: Partial<OnboardingFormStore['data']>) => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

type MyPersist = (
  config: StateCreator<OnboardingFormStore>,
  options: PersistOptions<OnboardingFormStore>
) => StateCreator<OnboardingFormStore>;

export const useOnboardingFormStore = create<OnboardingFormStore>(
  (persist as MyPersist)(
    set => ({
      loading: false,
      step: 1,
      data: {
        onboardingDetails: {
          email: '',
          gender: '',
          verification_code: '',
          country_code: '',
          orcid_number: '',
          first_name: '',
          last_name: '',
          phone_number: '',
          password: '',
          date_of_birth: '',
          education_level: '',
          notifications: false,
        },
      },
      setStep: step => set({ step }),
      setData: data => set(state => ({ data: { ...state.data, ...data } })),
      setLoading: loading => set({ loading }),
      resetStore: () => {
        set({
          step: 1,
          data: {
            onboardingDetails: {
              email: '',
              gender: '',
              verification_code: '',
              country_code: '',
              orcid_number: '',
              first_name: '',
              last_name: '',
              phone_number: '',
              password: '',
              date_of_birth: '',
              education_level: '',
              notifications: false,
            },
          },
        });
        localStorage.removeItem('OnboardingFormStore');
      },
    }),
    {
      name: 'OnboardingFormStore',
    }
  )
);
