import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const questionsSchema = z.object({
  are_you_investigator_or_local_principal_investigator: z.boolean(),
  has_co_principal_investigator: z.boolean(),
  has_project_sponsored: z.boolean(),
  completed_ethics_training: z.boolean(),
  specimen_will_be_shipped_out: z.boolean(),
  duration_of_research_in_years: z
    .number()
    .min(1, { message: "Duration must be at least 1 year" }),
});

type QuestionsSchema = z.infer<typeof questionsSchema>;

type Props = {
  handleNext: () => void;
  requestDetails?: RequestItems;
};

export default function ApplicationInformation({
  handleNext,
  requestDetails,
}: Props) {
  const { data, setData } = useEthicalRequestStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<QuestionsSchema>({
    resolver: zodResolver(questionsSchema),
    defaultValues: data.ethical_request_questions || requestDetails,
  });

  const {
    formState: { isValid, errors },
  } = form;

  async function onSubmit(values: QuestionsSchema) {
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
                {questionsData.questions.map((question) => {
                  if (question.type === "boolean") {
                    return (
                      <CustomFormField
                        key={question.name}
                        name={question.name}
                        label={question.label}
                        fieldType={FormFieldType.RADIO}
                        control={form.control}
                        subClassName="h-[0.875rem] w-[0.875rem] !bg-black"
                        options={[
                          { label: "Yes", value: true },
                          { label: "No", value: false },
                        ]}
                        error={errors[question.name as keyof QuestionsSchema]}
                        required
                      />
                    );
                  } else if (question.type === "counter") {
                    return (
                      <CustomFormField
                        key={question.name}
                        name={question.name}
                        fieldType={FormFieldType.COUNTER}
                        control={form.control}
                        label={question.label}
                        error={errors[question.name as keyof QuestionsSchema]}
                        required
                      />
                    );
                  }
                  return null;
                })}
              </div>
              <Button
                variant={isValid ? "default" : "ghost"}
                className={`my-4 focus:outline-none`}
                type="submit"
                disabled={!isValid}
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
