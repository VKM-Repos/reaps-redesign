import { create, StateCreator } from "zustand";
import {
    persist,
    PersistOptions,
  } from "zustand/middleware";

//   separate donor and investigator from requests to avoid rerender of appinfo

export type Investigator = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    letter_of_support: File | null;
};


  export interface DonorInvestigatorStore {
    addInvestigator: boolean;
    showDonor: boolean;
    donor_investigator_data: {
      details: {
        donors: string[];
        co_principal_investigators: Investigator[];
        
      };
    };
    setAddInvestigator: (addInvestigator: boolean) => void;
    setShowDonor: (showDonor: boolean) => void;
    setDonorInvestigatorData: (donor_investigator_data: Partial<DonorInvestigatorStore["donor_investigator_data"]>) => void;
    resetDonorInvestigatorStore: () => void;
  }
  
  type MyPersist = (
    config: StateCreator<DonorInvestigatorStore>,
    options: PersistOptions<DonorInvestigatorStore>
  ) => StateCreator<DonorInvestigatorStore>;
  
export const useDonorInvestigatorStore = create<DonorInvestigatorStore>(
    (persist as MyPersist)(
        (set) => ({
            addInvestigator: false,
            showDonor: false,
            donor_investigator_data: {
                details: {
                    donors: [],
                    co_principal_investigators: [],  
                },
            },
            setAddInvestigator: (addInvestigator) => set({ addInvestigator }),
            setShowDonor: (showDonor) => set({ showDonor }),
            setDonorInvestigatorData: (donor_investigator_data) => set((state) => ({ donor_investigator_data: { ...state.donor_investigator_data, ...donor_investigator_data } })),
            resetDonorInvestigatorStore: () => {
            set({
                addInvestigator: false,
                showDonor: false,
                donor_investigator_data: {
                    details: {
                        donors: [],
                        co_principal_investigators: [],
                    },
                }
            });
            localStorage.removeItem("DonorInvestigatorStore");
        },
    }),
    {
        name: "DonorInvestigatorStore",
    }
    )
);