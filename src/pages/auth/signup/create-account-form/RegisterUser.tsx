import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import Loader from "@/components/custom/Loader";
import { Form } from "@/components/ui/form";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import Cancel from "@/components/custom/Icons/Cancel";
import { useNavigate } from "react-router-dom";

type Props = {
  handleNext: Function
}

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Please fill this field"})
        .email({ message: "Invalid email address"})
});


export default function RegisterUser({ handleNext }: Props) {
  const { data, loading, setData, setLoading } = useOnboardingFormStore();
  const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });
    const { register, formState: { isValid } } = form;
    function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true);
      try {
        setData({
          onboardingDetails: {
            ...data.onboardingDetails,
            email: values.email
          }
        });
        
        setTimeout(() => {
            handleNext();
            setLoading(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    }

    

    return(
        <>
          {loading && <Loader />}
          <div className="py-[2rem] px-[1.25rem] max-h-[124px] md:p-[3.625rem] md:max-h-[130px] border-b border-[#0C0C0F29]">
            <div className="flex justify-between items-center w-full sm:w-4/5 mx-auto my-0">
              <div className="flex items-center">
                  <img src="icons/mark.svg" alt="Mark logo" />
                  <img className="md:block hidden" src="icons/reap-icon.svg" alt="Reap logo for website" />
              </div>
              <div>
                  <button className="bg-inherit focus:outline-none notransition border-none hover:border hover:bg-accent hover:rounded-full p-2.5"><Cancel /></button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased">
              <div className="flex flex-col justify-center items-center">
                  <h1 className="text-xl2 text-center font-semibold pt-10 pb-5 md:py-5">Create your Reaps account</h1>
                  <p className="pt-2 pb-10 text-sm text-[#454745]">Already have an account? <a onClick={() => {navigate('/login')}} className="underline font-semibold text-black hover:text-black" >Log in</a></p>
              </div>
              <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                      <FormInput
                          label="First enter your email address"
                          placeholder="johndoe@email.com"
                          {...register("email", {
                          required: "This field is required",
                          })}
                      />
                      <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Next</Button>
                  </form>
              </Form>
              </div>
              <div className="flex flex-col justify-center items-center">
              <p className="pt-2 pb-10 text-sm">By registering, you accept our <a href="/" className="underline font-semibold text-black hover:text-black" >Terms of use</a> and <a href="/" className="underline font-semibold text-black hover:text-black" >Privacy Policy</a></p>
              </div>
          </div>
        </>
    )
}