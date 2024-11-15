import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import useUserStore from "@/store/user-store";

export const EmailSettings = () => {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Please fill this field" })
      .email({ message: "Invalid email address" }),
  });

  const { user } = useUserStore();

  const defaultValues = {
    email: user?.email || "",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { register } = form;

  return (
    <>
      <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <Form {...form}>
          <form className="flex flex-col gap-6">
            <FormInput
              label="Email address"
              {...register("email", {
                required: "This field is required",
              })}
              className="!cursor-default"
              readOnly
            />
          </form>
        </Form>
      </div>
    </>
  );
};

// variant={isValid ? "default" : "ghost"}
