import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import GoogleDocLarge from "@/components/custom/Icons/GoogleDocLarge";
import { usePOST } from "@/hooks/usePOST.hook";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/custom/Loader";
import { usePATCH } from "@/hooks/usePATCH.hook";

const formSchema = z.object({
  title: z.string().min(1, { message: "Please add the file name" }),
  department: z.string().min(1, { message: "Please add the file name" }),
  file: z.instanceof(File, { message: "Please upload a file" }),
});
export default function UploadTemplate({
  refetch,
  template,
  action,
}: {
  refetch: () => void;
  template?: any;
  action: "create" | "edit";
}) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: template?.title || "",
      department: template?.department || "",
    },
  });

  const {
    register,
    formState: { isValid, errors },
    setValue,
  } = form;

  const simulateUpload = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };
  const successCallBack = () => {
    toast({
      title: "Feedback",
      description:
        action == "create"
          ? "Your template has been submitted."
          : "Your template has been changed.",
      variant: "default",
    });
    refetch();
  };

  const errorCallBack = (error: any) => {
    const message = error?.response?.data?.detail;
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
    refetch();
  };

  const { mutate, isPending, isSuccess } = usePOST("templates", {
    contentType: " multipart/form-data",
    callback: successCallBack,
    errorCallBack: errorCallBack,
  });
  console.log(template?.id, "?????");

  const { mutate: update, isPending: updating } = usePATCH(
    `templates?template_id=${template?.id}`,
    {
      contentType: " multipart/form-data",
      callback: successCallBack,
      errorCallBack: errorCallBack,
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("department", values.department);
    formData.append("file", values.file);

    switch (action) {
      case "create":
        mutate(formData);
        break;
      case "edit":
        update(formData, {
          onSuccess: () => {
            console.log("Successfully uploaded");
          },
          onError: () => {
            console.log("Error updating template");
          },
        });
        break;
      default:
        console.error("Invalid action");
        break;
    }
  }

  return (
    <>
      {isPending || isSuccess || updating ? (
        <Loader />
      ) : (
        <div className="w-full mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-5 items-center"
            >
              <div className="w-full">
                <FormInput
                  label="File Name"
                  {...register("title", {
                    required: "This field is required",
                  })}
                />
              </div>

              <div className="w-full">
                <FormInput
                  label="Department"
                  {...register("department", {
                    required: "This field is required",
                  })}
                />
              </div>

              <FormControl>
                <div className="flex flex-col gap-[2.5rem] w-full">
                  <div className="flex flex-col gap-2">
                    <div
                      className={`w-full h-full max-h-[10.625rem] border border-dashed rounded-lg pt-[2.375rem] pb-4 ${
                        errors.file ? "border-red-500" : "border-[#BBBBBB]"
                      }`}
                    >
                      <Dropzone
                        accept={{
                          "application/docx": [".docx"],
                          "application/xls": [".xls"],
                          "application/xlsx": [".xlsx"],
                        }}
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                          const file = acceptedFiles[0];
                          if (file) {
                            setValue("file", file, {
                              shouldValidate: true,
                            });
                            // const url = URL.createObjectURL(file);
                            simulateUpload();
                          }
                        }}
                      >
                        {({ getInputProps, getRootProps }) => (
                          <div
                            {...getRootProps()}
                            className="cursor-pointer border-dashed border-[#BBBBBB]"
                          >
                            <input {...getInputProps()} className="!w-full " />

                            <div className="flex flex-col items-center gap-2 mx-auto  w-full">
                              <GoogleDocLarge />

                              <div className="px-5">
                                <p className="font-semibold text-sm text-black">
                                  Drop documents here, or{" "}
                                  <span className="text-[#8C8C8C] text-sm font-normal">
                                    browse
                                  </span>
                                </p>
                                <p className="text-[#8C8C8C] text-sm">
                                  Supports: Only Microsoft Word (.docx) and
                                  Excel (.xls, .xlsx) files are allowed
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </div>

                    {errors.file && (
                      <p className="text-xs text-red-500 font-semibold">
                        Please upload a file
                      </p>
                    )}
                  </div>
                  <div className="border-[0.5px] w-full flex flex-col py-2 px-[.875rem]  rounded-lg border-[#D7D7D7]">
                    <p className="text-xs">Uploading...</p>
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-xs">{uploadProgress}%</p>
                      <p className="text-xs">&nbsp;</p>
                    </div>
                  </div>
                </div>
              </FormControl>

              <div className="flex w-full justify-end gap-3">
                <SheetClose className="bg-[hsl(var(--ghost))] text-[hsl(var(--ghost-foreground))] !py-2 !px-6 rounded">
                  Cancel
                </SheetClose>
                <SheetClose>
                  <Button
                    variant={
                      isValid && uploadProgress === 100 ? "default" : "ghost"
                    }
                    type="submit"
                    className="!py-3 !px-6 rounded"
                  >
                    Finish
                  </Button>
                </SheetClose>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
