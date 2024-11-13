import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/custom/FormInput';
import { useCallback, useState } from 'react';
import Loader from '@/components/custom/Loader';
import { Form } from '@/components/ui/form';
import { usePasswordStore } from '@/store/recoverPasswordStore';
import Cancel from '@/components/custom/Icons/Cancel';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

type Props = {
  handleNext: () => void;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please fill this field' })
    .email({ message: 'Invalid email address' }),
});

export default function AddEmail({ handleNext }: Props) {
  const { data, setData } = usePasswordStore();
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
          `${baseURL}auth/forget-password?email=${email}`,
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
          passwordDetails: {
            ...data.passwordDetails,
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
    [data.passwordDetails, handleNext, setData]
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
            <button
              className="bg-inherit notransition hover:bg-accent border-none p-2.5 hover:rounded-full hover:border focus:outline-none"
              onClick={() => {
                navigate(-1);
              }}
            >
              <Cancel />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto my-0 w-full px-4 antialiased md:w-4/5 md:px-0">
        <div className="flex flex-col items-center justify-center pt-[2.5rem]">
          <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#FFD13A]">
            <img
              className="h-[2.125rem] w-[2.5rem]"
              src="icons/square-lock-01.svg"
              alt="padlock in yellow background"
            />
          </div>
        </div>
        <div className="mx-auto my-0 w-full max-w-[358px] md:w-3/5 md:max-w-[526px]">
          <h1 className="text-xl2 pb-5 pt-10 text-center font-semibold md:py-5">
            Reset password
          </h1>
          <p className="pb-10 pt-2 text-center text-sm">
            Just enter the email address you registered with and we'll send you
            a 6-digit code to reset your password
          </p>
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
                Send Password reset code
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="pb-10 pt-2 text-sm">
            Need help?{' '}
            <a
              href="/"
              className="text-black hover:text-black font-semibold underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
