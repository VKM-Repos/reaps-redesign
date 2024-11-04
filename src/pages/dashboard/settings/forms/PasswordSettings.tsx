import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Loader from "@/components/custom/Loader";
import { toast } from "@/components/ui/use-toast";
import { usePOST } from "@/hooks/usePOST.hook";

export const PasswordSettings = ({ onSave }: { onSave: () => void }) => {
  const formSchema = z.object({
    new_password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Please fill this field" })
      .min(7, { message: "Password must contain a minimum of 7 characters" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
        message: "Password must contain a number and a letter",
      }),
  });

  const defaultValues = {
    new_password: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    formState: { isValid },
  } = form;
  const { mutate, isPending } = usePOST("auth/me/password");

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => {
        onSave();
        toast({
          title: "Feedback",
          description: "You have changed your password",
          variant: "default",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Error Changing ypur password",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <>
      {isPending && <Loader />}
      <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput
              label="Your password"
              type="password"
              placeholder="********"
              {...register("new_password", {
                required: "This field is required",
              })}
            />
            <Button
              variant={isValid ? "default" : "ghost"}
              className={`my-4 focus:outline-none py-4`}
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
