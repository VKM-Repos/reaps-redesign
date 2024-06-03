import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/custom/Loader";
import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordStore, usePasswordStore } from "@/context/recoverPasswordStore";
import AddEmail from "@/components/forms/recover-password/AddEmail";
import NewPassword from "@/components/forms/recover-password/NewPassword";
import EnterCode from "@/components/forms/recover-password/EnterCode";
import SuccessfulReset from "@/components/forms/recover-password/SuccessfulReset";

function RecoverPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const { step, setStep, data } = usePasswordStore((state) => ({
      step: state.step,
      setStep: state.setStep,
      data: state.data,
      setData: state.setData,
  }));

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
                    handleNext();
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
                    <NewPassword handleNext={onSubmitHandler} handleGoBack={handleGoBack} />
                );
            case 4:
                return <SuccessfulReset />;
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

export default RecoverPassword;