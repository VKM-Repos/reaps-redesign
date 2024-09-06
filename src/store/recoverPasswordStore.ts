import { create, StateCreator } from "zustand";
import {
    persist,
    PersistOptions,
} from "zustand/middleware";

export interface PasswordStore {
    step: number;
    data: {
        passwordDetails: {
            email: string;
            code: string;
            password: string;
        }
    };
    setStep: (step: number) => void;
    setData: (data: Partial<PasswordStore["data"]>) => void;
    resetStore: () => void;
}

type MyPersist = (
    config: StateCreator<PasswordStore>,
    options: PersistOptions<PasswordStore>
) => StateCreator<PasswordStore>;

export const usePasswordStore = create<PasswordStore>(
    (persist as MyPersist)(
    (set) => ({
        step: 1,
        data: {
            passwordDetails: {
            email: '',
            code: "",
            password: " "
            },
            
        },
        setStep: (step) => set({ step }),
        setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
        resetStore: () => {
        set({
            step: 1,
            data: {
                passwordDetails: {
                email: '',
                code: "",
                password: " "
                },
            },
        });
            localStorage.removeItem("PasswordStore");
        },
    }),
    {
        name: "PasswordStore",
    }
    )
);