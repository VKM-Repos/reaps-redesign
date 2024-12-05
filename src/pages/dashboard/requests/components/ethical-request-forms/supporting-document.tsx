import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import { Form } from "@/components/ui/form";
import { questionsData } from "./questions";
import { RequestItems } from "@/types/requests";

type Props = {
  handleNext: () => void;
  requestDetails?: RequestItems;
};

const MAX_FILE_SIZE = 3000000; // 3MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf", // PDF
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "image/jpeg", // JPEG
  "image/png", // PNG
  "image/gif", // GIF
];

const SupportingDocuments = ({ handleNext, requestDetails }: Props) => {
  const { data, setData } = useEthicalRequestStore();
  const { ethical_request_questions, ethical_request_files } = data;

  const requiredDocs = questionsData.documents.required;

  const dynamicRequiredDocs = questionsData.questions
    .filter(
      (question) =>
        question.type === "boolean" &&
        ethical_request_questions[question.name] === true
    )
    .flatMap((question) => question.requiresFile ?? []);

  const allRequiredDocs = [
    ...requiredDocs.map((doc) => ({
      name: doc.name,
      label: doc.label,
      type: "required",
    })),
    ...dynamicRequiredDocs.map((fileName) => {
      const question = questionsData.questions.find((q) =>
        q.requiresFile?.includes(fileName)
      );
      const label = question
        ? question.documentLabel
        : fileName.replace("_", " ").toUpperCase();

      return {
        name: fileName,
        label,
        type: "required",
      };
    }),
    ...questionsData.documents.optional.map((doc) => ({
      name: doc.name,
      label: doc.label,
      type: "optional",
    })),
  ];

  const fileValidationSchema = allRequiredDocs.reduce((schema, doc) => {
    schema[doc.name] = z.union([
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          `File size must not exceed ${MAX_FILE_SIZE / 1000000} MB`
        )
        .refine(
          (file) => ACCEPTED_FILE_TYPES.includes(file.type),
          "Unsupported file type"
        ),
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
      }),
    ]);
    return schema;
  }, {} as Record<string, z.ZodTypeAny>);

  const formSchema = z.object({
    ethical_request_files: z.object(fileValidationSchema),
  });

  const defaultValues = {
    ethical_request_files: Object.keys(ethical_request_files).reduce(
      (acc, key) => {
        const file = ethical_request_files[key];
        acc[key] = file instanceof File ? file : file || null;
        return acc;
      },
      {} as Record<
        string,
        File | { name: string; size: number; type: string } | null
      >
    ),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultValues || requestDetails,
  });

  const {
    formState: { isValid, errors },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const filesData = Object.keys(values.ethical_request_files).reduce(
        (acc, key) => {
          const file = values.ethical_request_files[key];
          if (file instanceof File) {
            acc[key] = file; // Save the raw File object
          } else {
            acc[key] = null; // Ensure proper handling of empty files
          }
          return acc;
        },
        {} as Record<string, File | null>
      );

      setData({
        ...data,
        ethical_request_files: filesData, // Save raw File objects in the store
      });

      console.table(filesData);
      handleNext();
    } catch (error) {
      console.error("Error saving files:", error);
    }
  };

  return (
    <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">
          Supporting Document
        </h1>
      </div>
      <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-8">
              {allRequiredDocs.map((doc) => {
                const errorMessage =
                  errors.ethical_request_files?.[doc.name]?.message;

                return (
                  <CustomFormField
                    key={doc.name}
                    name={`ethical_request_files.${doc.name}`}
                    control={form.control}
                    label={doc.label}
                    labelClassName="!font-semibold !text-black"
                    fieldType={FormFieldType.UPLOAD}
                    required
                    error={
                      typeof errorMessage === "string"
                        ? errorMessage
                        : undefined
                    }
                  />
                );
              })}
            </div>
            <Button
              variant={
                isValid || Object.keys(ethical_request_files).length > 0
                  ? "default"
                  : "ghost"
              }
              type="submit"
              disabled={
                !isValid && Object.keys(ethical_request_files).length === 0
              }
              className="my-4 focus:outline-none"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SupportingDocuments;
