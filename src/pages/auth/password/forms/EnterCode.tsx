import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { useMobileContext } from "@/context/MobileContext";
import TopBar from "@/components/custom/TopBar";
import { usePasswordStore } from "@/store/recoverPasswordStore";
import { useCallback, useEffect, useState } from "react";
import Loader from "@/components/custom/Loader";
import { toast } from "@/components/ui/use-toast";

type Props = {
  handleNext: () => void;
  handleGoBack: () => void;
};
const formSchema = z.object({
  code: z
    .string()
    .max(6, { message: "Please input the code sent to your email" })
    .min(6, { message: "Please input the code sent to your email" })
    .regex(/^\d+$/, {
      message: "Code must contain only digits",
    }),
});

export default function EnterCode({ handleNext, handleGoBack }: Props) {
  const { isMobile } = useMobileContext();
  const [loading, setLoading] = useState(false);
  const { data, setData } = usePasswordStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    formState: { isValid },
  } = form;

  const [sendAgain, setSendAgain] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const checkEmailForVerification = async (email: string) => {
    try {
      const baseURL = import.meta.env.VITE_APP_BASE_URL;
      const response = await fetch(
        `${baseURL}auth/forget-password?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "institution-context": "ai",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || "Error in verifying email";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      toast({
        title: "Success",
        description: responseData.detail,
        variant: "default",
      });
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  const handleResend = async () => {
    if (sendAgain) {
      await checkEmailForVerification(data.passwordDetails.email);
      setCountdown(60);
      setSendAgain(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setSendAgain(true);
    }
  }, [countdown]);

  const verifyCode = useCallback(
    async (code: string) => {
      try {
        setLoading(true);

        setData({
          passwordDetails: {
            ...data.passwordDetails,
            code: code,
          },
        });

        handleNext();
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    },
    [data.passwordDetails, handleNext, setData]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    verifyCode(values.code);
  }

  return (
    <>
      {loading && <Loader />}
      <TopBar title="Back" />
      <div className="relative my-0 w-full px-4 antialiased md:mx-auto md:w-4/5">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="absolute left-0">
            {!isMobile ? <BackButton title="Back" goBack={handleGoBack} /> : ""}
          </div>
          <div className="pt-[2.5rem]">
            <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#FFD13A] ">
              <img
                className="h-[2.125rem] w-[2.5rem]"
                src="icons/mail-01.svg"
                alt="padlock in yellow background"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto my-0 w-full max-w-[375px] md:w-3/5 md:max-w-[526px]">
          {/* {isLoading && <Loader />} */}
          <h1 className="p-[1rem] text-center text-[1.625rem] font-semibold leading-[2rem]">
            Check your email
          </h1>
          <div className="pb-10 pt-2">
            <p className="text-center text-sm leading-[14px] text-[#454745]">
              We've sent a 6-digit code to{" "}
              <span className="font-black font-bold">
                {data.passwordDetails.email}
              </span>
              . If you don’t get the email soon, check your spam folder. Still
              need help?
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <FormInput
                label="Enter 6-digit code"
                type="number"
                {...register("code", {
                  required: "This field is required",
                })}
                className="no-spinner"
              />
              <div className="flex flex-col items-center justify-center">
                <p className="pb-7 pt-2 text-sm">
                  Still need help?{" "}
                  <a
                    href="/"
                    className="text-black hover:text-black font-semibold underline"
                  >
                    Contact us
                  </a>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="pb-7 pt-2 text-sm text-[#454745]">
                  Didn't get an email?{" "}
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
                variant={isValid ? "default" : "ghost"}
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
