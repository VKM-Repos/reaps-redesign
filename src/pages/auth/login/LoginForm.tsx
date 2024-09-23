import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "../../../components/custom/FormInput";
import { Form } from "../../../components/ui/form";
import { useState } from "react";
import Loader from "../../../components/custom/Loader";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please fill this field" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Please fill this field" }),
});

export function LoginForm() {
  const [isLoading ,setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { register, formState: { isValid } } = form;
  const navigate = useNavigate();

  function goToHome(){
    navigate("/home");
  }

  function onSubmit() {
    try {
      setIsLoading(true);
      setTimeout(() => {

        setIsLoading(false);
        goToHome();
      }, 3000);
     
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormInput
            label="Your email address"
            placeholder="johndoe@email.com"
            {...register("username", {
              required: "This field is required",
            })}
          />
          <FormInput
            label="Your password"
            type="password"
            placeholder="********"
            {...register("password", {
              required: "This field is required",
            })}
          />
          <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Log in</Button>
        </form>
      </Form>
    </>
  );
}
