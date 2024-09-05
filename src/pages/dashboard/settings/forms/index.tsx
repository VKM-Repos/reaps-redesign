// forms index to use as wrapper?
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/Loader";
import { z } from "zod";


interface SettingsFormProps<T> {
    formSchema: any;
    onSubmit: (values: T) => void;
    children: React.ReactNode;
  }
  
  export function SettingsForm<T>({ formSchema, onSubmit, children }: SettingsFormProps<T>) {
    const form = useForm({
      resolver: zodResolver(formSchema),
    });
    const { handleSubmit, formState: { isValid }, reset } = form;
    const [loading, setLoading] = useState(false);
  
    const submitHandler = async (values: z.infer<typeof formSchema>) => {
      setLoading(true);
      try {
        await onSubmit(values);
        setLoading(false);
        reset();
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    return (
      <>
        {loading && <Loader />}
        <Form {...form}>
          <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6">
            {children}
            <Button variant={isValid ? "default" : "ghost"} className="my-4 focus:outline-none py-4">Save</Button>
          </form>
        </Form>
      </>
    );
  }