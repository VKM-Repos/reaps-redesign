import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import { questionsData } from "./questions";
import { RequestItems } from "@/types/requests";

const researchSchema = z.object({
  research_title: z
    .string()
    .min(1, { message: "Required field" })
    .max(255, { message: "Title must not exceed 255 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Field cannot be empty or just spaces",
    }),
  objectives_of_the_study: z
    .string()
    .min(1, { message: "Required field" })
    .max(2000, { message: "Objectives must not exceed 2000 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Field cannot be empty or just spaces",
    }),
});

type ResearchSchema = z.infer<typeof researchSchema>;

type Props = {
  handleNext: () => void;
  requestDetails?: RequestItems;
};

export default function ResearchInformation({
  handleNext,
  requestDetails,
}: Props) {
  const { data, setData } = useEthicalRequestStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<ResearchSchema>({
    resolver: zodResolver(researchSchema),
    defaultValues: data.ethical_request_questions || requestDetails,
  });

  const {
    formState: { isValid, errors },
  } = form;

  // Watch the value of "objectives_of_the_study" field
  const objectivesValue = useWatch({
    control: form.control,
    name: "objectives_of_the_study",
    defaultValue: "",
  });

  async function onSubmit(values: ResearchSchema) {
    try {
      setLoading(true);

      setData({
        ...data,
        ethical_request_questions: {
          ...data.ethical_request_questions,
          ...values,
        },
      });

      handleNext();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">
            Research Information
          </h1>
        </div>
        <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-8">
                {questionsData.questions
                  .filter((q) => q.type === "string")
                  .map((question) => (
                    <div key={question.name}>
                      <CustomFormField
                        name={question.name}
                        fieldType={
                          question.name === "objectives_of_the_study"
                            ? FormFieldType.TEXTAREA
                            : FormFieldType.INPUT
                        }
                        label={question.label}
                        control={form.control}
                        error={errors[question.name as keyof ResearchSchema]}
                        required
                        placeholder={`Enter ${question.label.toLowerCase()}`}
                        className={
                          question.name === "objectives_of_the_study"
                            ? "textarea resize-none"
                            : "input"
                        }
                      />

                      {question.name === "objectives_of_the_study" && (
                        <div className="text-sm text-gray-600 mt-1 text-right">
                          {objectivesValue.length}/2000 characters
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <Button
                variant={isValid ? "default" : "ghost"}
                disabled={!isValid}
                className={`my-4 focus:outline-none`}
                type="submit"
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
