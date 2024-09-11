import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CheckboxGroup, useRequestsStore } from "@/store/RequestFormStore";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import { questions } from "@/lib/helpers";
import { useEffect } from "react";

import { useStepper } from "@/context/StepperContext";
import SavingLoader from "../components/SavingLoader";

const formSchema = z.object({
  checkbox: z.object({
    question1: z.string().min(1, { message: "Please select an answer" }),
    question2: z.string().min(1, { message: "Please select an answer" }),
    question3: z.string().min(1, { message: "Please select an answer" }),
    question4: z.string().min(1, { message: "Please select an answer" }),
    question5: z.string().min(1, { message: "Please select an answer" }),
    question6: z.string().min(1, { message: "Please select an answer" }),
    question7: z
      .number()
      .min(1, { message: "This field is required" })
      .max(12, { message: "The maximum allowed value is 12" }),
  }),
});

type Props = {
  handleNext: Function;
};

export default function AppInfo({ handleNext }: Props) {
  const { data, setData } = useRequestsStore();
  const checkbox = data.requestsDetails.checkbox as CheckboxGroup;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkbox: {
        question1: checkbox?.question1 || "",
        question2: checkbox?.question2 || "",
        question3: checkbox?.question3 || "",
        question4: checkbox?.question4 || "",
        question5: checkbox?.question5 || "",
        question6: checkbox?.question6 || "",
        question7: checkbox?.question7 || 1,
      },
    },
  });
  const {
    formState: { isValid, errors },
  } = form;
  const { setStepper } = useStepper();

  const updateStep = () => {
    setStepper(0);
  };

  useEffect(() => {
    updateStep();
  }, [updateStep]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setData({
        requestsDetails: {
          ...data.requestsDetails,
          checkbox: {
            question1: values.checkbox.question1,
            question2: values.checkbox.question2,
            question3: values.checkbox.question3,
            question4: values.checkbox.question4,
            question5: values.checkbox.question5,
            question6: values.checkbox.question6,
            question7: values.checkbox.question7,
          },
        },
      });
      handleNext();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
      <SavingLoader />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">
          Application Information
        </h1>
      </div>
      <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-8 ">
              {questions.map((question) => (
                <CustomFormField
                  key={question.name}
                  name={question.name}
                  control={form.control}
                  label={question.label}
                  error={
                    (errors.checkbox as any)?.[question.name] as
                      | FieldError
                      | undefined
                  }
                  subClassName="h-[0.875rem] w-[0.875rem] !bg-black"
                  fieldType={FormFieldType.RADIO}
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                  required={true}
                />
              ))}
              <CustomFormField
                name="question7"
                fieldType={FormFieldType.COUNTER}
                error={
                  (errors.checkbox as any)?.["question7"] as
                    | FieldError
                    | undefined
                }
                label="What is the duration of the research (months)"
                control={form.control}
                required
              />
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
  );
}
