import { Button } from '@/components/ui/button';
import BackButton from '@/components/custom/BackButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/custom/FormInput';
import { useOnboardingFormStore } from '@/store/CreateOnboardingFormStore';
import { useMobileContext } from '@/context/MobileContext';
import Loader from '@/components/custom/Loader';
import { useCallback, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

type Props = {
  handleNext: () => void;
  handleGoBack: () => void;
};
const formSchema = z.object({
  code: z
    .string()
    .max(6, { message: 'Please input the code sent to your email' })
    .min(6, { message: 'Please input the code sent to your email' })
    .regex(/^\d+$/, { message: 'Code must contain only digits' }),
});

export default function SendCode({ handleNext, handleGoBack }: Props) {
  const { isMobile } = useMobileContext();
  const { data, setData } = useOnboardingFormStore();
  const [loading, setLoading] = useState(false);
  const [sendAgain, setSendAgain] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const checkEmailForVerification = async (email: string) => {
    try {
      const baseURL = import.meta.env.VITE_APP_BASE_URL;
      const response = await fetch(
        `${baseURL}auth/verification-code?email=${email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'institution-context': 'default_context',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Error in verifying email';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      toast({
        title: 'Success',
        description: responseData.detail,
        variant: 'default',
      });
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const handleResend = async () => {
    if (sendAgain) {
      await checkEmailForVerification(data.onboardingDetails.email);
      setCountdown(60);
      setSendAgain(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setSendAgain(true);
    }
  }, [countdown]);

  const verifyCode = useCallback(
    async (code: string) => {
      try {
        setLoading(true);

        const baseURL = import.meta.env.VITE_APP_BASE_URL;
        const response = await fetch(
          `${baseURL}auth/verify-email?verification_code=${code}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'institution-context': 'default_context',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.detail || 'error in verifying code';
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });
          throw new Error(errorMessage);
        }

        const responseData = await response.json();
        toast({
          title: 'Feedback',
          description: `${responseData.detail}`,
          variant: 'default',
        });

        setData({
          onboardingDetails: {
            ...data.onboardingDetails,
            verification_code: code,
          },
        });

        handleNext();
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
    },
    [data.onboardingDetails, handleNext, setData]
  );

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setSendAgain(true);
    }
  }, [countdown]);

  const {
    register,
    formState: { isValid },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    verifyCode(values.code);
  }

  return (
    <>
      {loading && <Loader />}
      <div className="relative my-0 w-full px-4 pt-[2.5rem] antialiased md:mx-auto md:w-4/5">
        {!isMobile ? <BackButton title="Back" goBack={handleGoBack} /> : ''}
        <div className="mx-auto my-0 w-full max-w-[375px] md:w-3/5 md:max-w-[526px]">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl2 pb-5 pt-10 text-center font-semibold md:py-5">
              Enter the 6-digit code
            </h1>
            <div className="pb-5 pt-2">
              <p className="text-center text-sm leading-[14px] text-[#454745]">
                For security, we've sent you an email to{' '}
                <span className="font-black font-bold">
                  {data.onboardingDetails.email}
                </span>
                . Simply enter the code in the email into the box below to
                proceed.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <FormInput
                label="Your 6-digit code"
                type="number"
                {...register('code', {
                  required: 'This field is required',
                })}
                className="no-spinner"
              />
              <div className="flex flex-col items-center justify-center">
                <p className="pb-7 pt-2 text-sm text-[#454745]">
                  Didn't get an email?{' '}
                  {sendAgain ? (
                    <a
                      onClick={handleResend}
                      className="text-black hover:text-black font-semibold underline"
                    >
                      Send it again
                    </a>
                  ) : (
                    <span className="text-black font-semibold">
                      {countdown}s
                    </span>
                  )}
                </p>
              </div>
              <Button
                variant={isValid ? 'default' : 'ghost'}
                className={`my-4 focus:outline-none`}
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
