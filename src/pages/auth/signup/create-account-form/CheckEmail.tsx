import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/custom/FormInput';
import Loader from '@/components/custom/Loader';
import { Form } from '@/components/ui/form';
import { useOnboardingFormStore } from '@/store/CreateOnboardingFormStore';
import Cancel from '@/components/custom/Icons/Cancel';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useCallback, useState } from 'react';

type Props = {
  handleNext: () => void;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please fill this field' })
    .email({ message: 'Invalid email address' }),
});

export default function CheckEmail({ handleNext }: Props) {
  const { data, setData } = useOnboardingFormStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    formState: { isValid },
  } = form;

  const checkEmailForVerification = useCallback(
    async (email: string) => {
      try {
        setLoading(true);

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
          const errorMessage = errorData.detail || 'error in verifying email';
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
            email: email,
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    checkEmailForVerification(values.email);
  }

  return (
    <>
      {loading && <Loader />}
      <div className="max-h-[124px] border-b border-[#0C0C0F29] px-[1.25rem] py-[2rem] md:max-h-[130px] md:p-[3.625rem]">
        <div className="mx-auto my-0 flex w-full items-center justify-between sm:w-4/5">
          <div className="flex items-center">
            <img src="icons/mark.svg" alt="Mark logo" />
            <img
              className="hidden md:block"
              src="icons/reap-icon.svg"
              alt="Reap logo for website"
            />
          </div>
          <div>
            <button className="bg-inherit notransition hover:bg-accent border-none p-2.5 hover:rounded-full hover:border focus:outline-none">
              <Cancel />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto my-0 w-full px-4 antialiased md:w-4/5 md:px-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl2 pb-5 pt-10 text-center font-semibold md:py-5">
            Create your Reaps account
          </h1>
          <p className="pb-10 pt-2 text-sm text-[#454745]">
            Already have an account?{' '}
            <a
              onClick={() => {
                navigate('/login');
              }}
              className="text-black hover:text-black font-semibold underline"
            >
              Log in
            </a>
          </p>
        </div>
        <div className="mx-auto my-0 w-full max-w-[358px] md:w-3/5 md:max-w-[526px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <FormInput
                label="First enter your email address"
                placeholder="johndoe@email.com"
                {...register('email', {
                  required: 'This field is required',
                })}
              />
              <Button
                variant={isValid ? 'default' : 'ghost'}
                className={`my-4 focus:outline-none`}
              >
                Next
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="pb-10 pt-2 text-sm">
            By registering, you accept our{' '}
            <a
              href="/"
              className="text-black hover:text-black font-semibold underline"
            >
              Terms of use
            </a>{' '}
            and{' '}
            <a
              href="/"
              className="text-black hover:text-black font-semibold underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
