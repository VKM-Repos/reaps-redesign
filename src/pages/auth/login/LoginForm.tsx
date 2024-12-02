import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "../../../components/custom/FormInput";
import { Form } from "../../../components/ui/form";
import { useState, useCallback } from "react";
import Loader from "../../../components/custom/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginResponseData } from "@/types/auth";
import { toast } from "@/components/ui/use-toast";
import useUserStore from "@/store/user-store";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Please fill this field" }),
  password: z.string().min(1, { message: "Please fill this field" }),
});

type LoginRequestData = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginRequestData>({ resolver: zodResolver(formSchema) });
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUserStore();

  const login = useCallback(
    async (data: LoginRequestData) => {
      try {
        setIsLoading(true);

        const baseURL = import.meta.env.VITE_APP_BASE_URL;
        const response = await fetch(`${baseURL}auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "institution-context": "ai",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.detail || "Login failed";
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
          throw new Error(errorMessage);
        }

        const responseData: LoginResponseData = await response.json();

        toast({
          title: "Feedback",
          description: "You have been logged in successfully",
          variant: "default",
        });

        setUser({
          user: responseData.user,
          access_token: responseData.access_token,
          refresh_token: responseData.refresh_token,
        });

        const searchParams = new URLSearchParams(location.search);
        const redirectPath = searchParams.get("redirect") || "/home";

        const requiredRole = searchParams.get("role");
        if (requiredRole && requiredRole !== responseData.user.user_type) {
          navigate("/home");
        } else {
          navigate(redirectPath);
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [location.search, navigate, setUser]
  );

  function onSubmit(data: LoginRequestData) {
    login(data);
  }

  return (
    <>
      {isLoading && <Loader />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormInput
            label="Your email address"
            placeholder="johndoe@email.com"
            {...form.register("email")}
          />
          <FormInput
            label="Your password"
            type="password"
            placeholder="********"
            {...form.register("password")}
          />
          <Button
            type="submit"
            variant={form.formState.isValid ? "default" : "ghost"}
            className="my-4 focus:outline-none"
            disabled={!form.formState.isValid || isLoading}
          >
            Log in
          </Button>
        </form>
      </Form>
    </>
  );
}
