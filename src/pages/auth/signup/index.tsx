import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  OnboardingFormStore,
  useOnboardingFormStore,
} from '@/store/CreateOnboardingFormStore';
import Loader from '@/components/custom/Loader';
import SendCode from '@/pages/auth/signup/create-account-form/SendCode';
import Password from '@/pages/auth/signup/create-account-form/RegisterPassword';
import RegisterSuccess from '@/pages/auth/signup/create-account-form/RegisterSuccess';
import PersonalInfo from '@/pages/auth/signup/create-account-form/PersonalInfo';
import TopBar from '@/components/custom/TopBar';
import CheckEmail from '@/pages/auth/signup/create-account-form/CheckEmail';
import { toast } from '@/components/ui/use-toast';

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { step, setStep, resetStore } = useOnboardingFormStore();

  const stepTitles: Record<number, string> = {
    1: '',
    2: 'Email',
    3: 'Verification',
    4: 'Personal Info',
  };

  const RenderForm = () => {
    const handleNext = () => {
      setStep(step + 1);
    };

    const handleGoBack = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    };

    const createOnboardingPage = useCallback(async () => {
      try {
        setIsLoading(true);
        const { data } = useOnboardingFormStore.getState();

        const payload = {
          email: data?.onboardingDetails?.email,
          first_name: data?.onboardingDetails?.first_name,
          last_name: data?.onboardingDetails?.last_name,
          phone_number: data?.onboardingDetails?.phone_number,
          country_code: data?.onboardingDetails?.country_code,
          education_level: data?.onboardingDetails?.education_level,
          password: data?.onboardingDetails?.password,
          // date_of_birth: '2024-10-30',
          // gender: 'male',
        };

        const baseURL = import.meta.env.VITE_APP_BASE_URL;
        const response = await fetch(`${baseURL}users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Institution-Context': 'default_context',
          },
          body: JSON.stringify(payload),
        });

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

        // const responseData = await response.json();
        toast({
          title: 'Feedback',
          description: `user created`,
          variant: 'default',
        });
        resetStore();

        handleNext();
      } catch (error) {
        console.error('Sign up error:', error);
      } finally {
        setIsLoading(false);
      }
    }, []);

    const { handleSubmit } = useForm<OnboardingFormStore>();
    const onSubmitHandler: SubmitHandler<OnboardingFormStore> = async () => {
      await handleSubmit(createOnboardingPage)();
    };

    switch (step) {
      case 1:
        return <CheckEmail handleNext={handleNext} />;
      case 2:
        return <SendCode handleNext={handleNext} handleGoBack={handleGoBack} />;
      case 3:
        return (
          <PersonalInfo handleNext={handleNext} handleGoBack={handleGoBack} />
        );
      case 4:
        return (
          <Password handleNext={onSubmitHandler} handleGoBack={handleGoBack} />
        );
      case 5:
        return <RegisterSuccess />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence initial={true} mode="wait">
      {isLoading && <Loader />}
      <>
        {step !== 1 && !(step >= 5) && <TopBar title={stepTitles[step]} />}
        <RenderForm />
      </>
    </AnimatePresence>
  );
}
