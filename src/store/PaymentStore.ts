import { create, StateCreator } from "zustand";
import {
    persist,
    PersistOptions,
} from "zustand/middleware";

export interface PaymentStore {
    step: number;
    data: {
        paymentDetails: {
            categories: [];
            payed: boolean;
        }
    };
    setStep: (step: number) => void;
    setData: (data: Partial<PaymentStore["data"]>) => void;
    resetStore: () => void;
}

type MyPersist = (
    config: StateCreator<PaymentStore>,
    options: PersistOptions<PaymentStore>
) => StateCreator<PaymentStore>;

export const usePaymentStore = create<PaymentStore>(
    (persist as MyPersist)(
    (set) => ({
        step: 1,
        data: {
            paymentDetails: {
                categories: [],
                payed: false,
            }
            
        },
        setStep: (step) => set({ step }),
        setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
        resetStore: () => {
        set({
            step: 1,
            data: {
                paymentDetails: {
                    categories: [],
                    payed: false,
                }
            },
        });
            localStorage.removeItem("PaymentStore");
        },
    }),
    {
        name: "PaymentStore",
    }
    )
);