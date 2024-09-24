import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/custom/Loader";
import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordStore, usePasswordStore } from "@/store/recoverPasswordStore";
import AddEmail from "@/pages/auth/password/forms/AddEmail";
import NewPassword from "@/pages/auth/password/forms/NewPassword";
import EnterCode from "@/pages/auth/password/forms/EnterCode";
import SuccessfulReset from "@/pages/auth/password/forms/SuccessfulReset";

export default function RecoverPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const { step, setStep, data, resetStore } = usePasswordStore();

    const RenderForm = () => {
        const handleNext = () => {
            setStep(step + 1);
        };

        const handleGoBack = () => {
            if (step > 1) {
                setStep(step - 1);
            }
        };

        const RecoverPassword = async () => {
            setIsLoading(true);
            try {
                let formData = new FormData();
                formData.append("email", data?.passwordDetails?.email);
                formData.append("code", data?.passwordDetails?.code);
                formData.append("password", data?.passwordDetails?.password);

                setTimeout(() => {
                    setIsLoading(false);
                    resetStore();
                }, 5000);
            } catch (error: any) {
                console.error("Error recovering password: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        const { handleSubmit } = useForm<PasswordStore>();
        const onSubmitHandler: SubmitHandler<PasswordStore> = async () => {
            await handleSubmit(RecoverPassword)();
        };

        switch (step) {
            case 1:
                return <AddEmail handleNext={handleNext} />;
            case 2:
                return (
                    <EnterCode handleNext={handleNext} handleGoBack={handleGoBack} />
                );
            case 3:
                return (
                    <NewPassword handleNext={handleNext} handleGoBack={handleGoBack} />
                );
            case 4:
                return <SuccessfulReset handleNext={onSubmitHandler}/>;
            default:
                return null;
        }
    };

    return (
        <AnimatePresence initial={true} mode="wait">
            {isLoading && <Loader />}
            <RenderForm />
        </AnimatePresence>
    );
}