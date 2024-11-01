import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
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
import useUserStore from "@/store/user-store";
import { usePATCH } from "@/hooks/usePATCH.hook";

export const EducationSettings = ({ onSave }: { onSave: () => void }) => {
  const educationLevels = [
    { title: "High School", value: "high_school" },
    { title: "Bachelors", value: "bachelors" },
    { title: "Masters", value: "masters" },
    { title: "PHD", value: "phd" },
  ];
  const formSchema = z.object({
    education_level: z.string().min(1, { message: "Please fill this field" }),
    orcid_number: z.string().min(1, { message: "Please fill this field" }),
  });

  const { user } = useUserStore();
  const defaultValues = {
    education_level: user?.education_level || "",
    orcid_number: user?.orcid_number || "",
  };
  const [education, setEducation] = useState(user?.education_level || "Select");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    setValue,
    register,
    formState: { isValid },
  } = form;
  const { mutate, isPending } = usePATCH("users/me", { method: "PUT" });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      phone_number: user?.phone_number,
      country_code: "+234",
    };
    mutate(data, {
      onSuccess: () => {
        onSave();
      },
      onError: (error) => {
        console.log(error);
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
            <div className="mt-2 flex flex-col gap-6">
              <div className="flex flex-col text-xs mt-2">
                <Select
                  onValueChange={(value: string) => {
                    setValue("education_level", value, {
                      shouldValidate: true,
                    });
                    setEducation(value);
                  }}
                >
                  <Label className="font-sm">Select your Education</Label>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder={education} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel></SelectLabel>
                      {educationLevels &&
                        educationLevels.map((educationLevel) => (
                          <SelectItem value={educationLevel.value}>
                            {educationLevel.title}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FormInput
                label="ORCID ID"
                {...register("orcid_number", {
                  required: "This field is required",
                })}
              />
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
