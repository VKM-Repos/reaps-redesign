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
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/gif",
];

const SupportingDocuments = ({ handleNext, requestDetails }: Props) => {
  const { data, setData } = useEthicalRequestStore();
  const { ethical_request_files } = data;

  const requiredDocs = questionsData.documents.required;
  const dynamicRequiredDocs = questionsData.questions
    .filter(
      (question) =>
        question.type === "boolean" &&
        data.ethical_request_questions[question.name] === true
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
      return { name: fileName, label, type: "required" };
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
    ethical_request_files: allRequiredDocs.reduce((acc, doc) => {
      const storeFile = ethical_request_files[doc.name];
      const requestFile = requestDetails?.[doc.name as keyof RequestItems];

      // Map requestFile (URL string) into the required object structure
      if (typeof requestFile === "string") {
        acc[doc.name] = {
          name: requestFile.split("/").pop() || "unknown", // Extract file name from URL
          size: 0, // Set size to 0 as it's unavailable for URLs
          type: "application/octet-stream", // Set a generic MIME type
        };
      } else if (storeFile) {
        acc[doc.name] = storeFile;
      } else {
        acc[doc.name] = null; // Default to null
      }

      return acc;
    }, {} as Record<string, File | { name: string; size: number; type: string } | null>),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues,
  });

  const {
    formState: { isValid, errors },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedFiles = Object.keys(values.ethical_request_files).reduce(
      (acc, key) => {
        const file = values.ethical_request_files[key];
        const storeFile = ethical_request_files[key];
        const requestFile = requestDetails?.[key as keyof RequestItems];

        // Add to store only if the file is changed
        if (file instanceof File) {
          acc[key] = file; // File is newly uploaded
        } else if (storeFile && storeFile === file) {
          acc[key] = storeFile; // Keep existing store file if unchanged
        } else if (
          typeof requestFile === "string" &&
          requestFile === file?.name
        ) {
          // Skip if file is unchanged and matches the request data
          return acc;
        } else {
          acc[key] = null; // Explicitly set to null for missing files
        }
        return acc;
      },
      {} as Record<string, File | null>
    );

    // Update the store only with modified or valid files
    setData({
      ...data,
      ethical_request_files: updatedFiles,
    });

    handleNext();
  };

  return (
    <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">
          Supporting Documents
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
