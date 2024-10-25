import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Loader from "@/components/custom/Loader";

export const AdddressSettings = ({ onSave }: { onSave: () => void }) => {
  const contries = ["Nigeria", "Uganda", "Kenya"];
  const states = ["Osun", "Lagos", "Sokoto"];
  // const lgas = ["Osun North", "Apapa", "Gada"];
  const formSchema = z.object({
    country: z.string().min(1, { message: "Please fill this field" }),
    state: z.string().min(1, { message: "Please fill this field" }),
    lga: z.string().min(1, { message: "Please fill this field" }),
  });

  const [loading, setLoader] = useState(false);
  const defaultValues = {
    country: "",
    state: "",
    lga: "",
  };
  const [country, setEducation] = useState("Nigeria");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    setValue,
    formState: { isValid },
    reset,
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoader(true);
    console.log(values);
    onSave();
    reset();
  }

  return (
    <>
      {loading && <Loader />}
      <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="mt-2 flex flex-col gap-6">
              <div className="flex flex-col text-xs mt-2">
                <Select
                  onValueChange={(value: string) => {
                    setValue("country", value, { shouldValidate: true });
                    setEducation(value);
                  }}
                >
                  <Label className="font-sm">Country</Label>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder={country} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel></SelectLabel>
                      {contries &&
                        contries.map((country) => (
                          <SelectItem value={country}>{country}</SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col text-xs mt-2">
                <Select
                  onValueChange={(value: string) => {
                    setValue("state", value, { shouldValidate: true });
                    setEducation(value);
                  }}
                >
                  <Label className="font-sm">State</Label>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder={"State"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel></SelectLabel>
                      {states &&
                        states.map((state) => (
                          <SelectItem value={state}>{state}</SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
