/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/custom/Loader';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PasswordStore, usePasswordStore } from '@/store/recoverPasswordStore';
import AddEmail from '@/pages/auth/password/forms/AddEmail';
import NewPassword from '@/pages/auth/password/forms/NewPassword';
import EnterCode from '@/pages/auth/password/forms/EnterCode';
import SuccessfulReset from '@/pages/auth/password/forms/SuccessfulReset';
import { toast } from '@/components/ui/use-toast';

export default function RecoverPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { step, setStep, resetStore } = usePasswordStore();

  const RenderForm = () => {
    const handleNext = () => {
      setStep(step + 1);
    };

    const handleGoBack = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    };

    const recoverPassword = async () => {
      setIsLoading(true);
      try {
        const { data } = usePasswordStore.getState();

        const payload = {
          email: data?.passwordDetails?.email,
          verification_code: data?.passwordDetails?.code,
          new_password: data?.passwordDetails?.password,
        };

        const baseURL = import.meta.env.VITE_APP_BASE_URL;
        const response = await fetch(
          `${baseURL}auth/reset-password?email=${payload.email}&verification_code=${payload.verification_code}&new_password=${payload.new_password}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Institution-Context': 'default_context',
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.detail || 'error in creating account';
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });
          throw new Error(errorMessage);
        }

        resetStore();

        handleNext();
      } catch (error: any) {
        console.error('Error recovering password: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    const { handleSubmit } = useForm<PasswordStore>();
    const onSubmitHandler: SubmitHandler<PasswordStore> = async () => {
      await handleSubmit(recoverPassword)();
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
          <NewPassword
            handleNext={onSubmitHandler}
            handleGoBack={handleGoBack}
          />
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
